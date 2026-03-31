import { Injectable, Inject, Logger } from '@nestjs/common';
import { PAC_PROVIDER, PacProvider } from '@virteex/domain-fiscal-domain';
import { XMLBuilder } from 'fast-xml-parser';
import { XsltService } from '@virteex/platform-xslt';
import * as crypto from 'crypto';

export interface FiscalStampingRequest {
  payroll: any;
  tenantConfig: any;
}

export interface FiscalStampingResult {
  uuid: string;
  xml: string;
  stampedAt: Date;
}

@Injectable()
export class StampFiscalDocumentUseCase {
  private readonly logger = new Logger(StampFiscalDocumentUseCase.name);
  private readonly DEFAULT_UMA = 108.57; // 2024 UMA

  constructor(
    @Inject(PAC_PROVIDER) private readonly pacProvider: PacProvider,
    private readonly xsltService: XsltService
  ) {}

  async execute(request: FiscalStampingRequest): Promise<FiscalStampingResult> {
    const { payroll, tenantConfig } = request;

    // Build XML
    const xml = await this.buildSignedPayrollXml(payroll, tenantConfig);

    // Stamp
    const stamp = await this.pacProvider.stamp(xml);

    return {
      uuid: stamp.uuid,
      xml: stamp.xml,
      stampedAt: new Date(stamp.fechaTimbrado)
    };
  }

  private async buildSignedPayrollXml(payroll: any, tenantConfig: any): Promise<string> {
    const builder = new XMLBuilder({
        ignoreAttributes: false,
        suppressEmptyNode: true,
        format: true
    });

    const formatDates = (date: Date | string) => {
        if (date instanceof Date) return date.toISOString().split('T')[0];
        return new Date(date).toISOString().split('T')[0];
    };

    const paymentDateStr = formatDates(payroll.paymentDate);
    const periodStartStr = formatDates(payroll.periodStart);
    const periodEndStr = formatDates(payroll.periodEnd);

    const employeeName = `${payroll.employee.firstName} ${payroll.employee.lastName}`;

    // Simple Logic for Exemptions (LISR)
    const percepcionesData = payroll.details.filter((d: any) => d.type === 'EARNING').map((e: any) => {
        const satKey = this.mapConceptToSatKey(e.concept, 'EARNING');
        const amount = Number(e.amount);
        let exempt = 0;

        const conceptLower = e.concept.toLowerCase();
        if (conceptLower.includes('aguinaldo')) {
            const limit = 30 * this.DEFAULT_UMA;
            exempt = Math.min(amount, limit);
        } else if (conceptLower.includes('prima vacacional')) {
            const limit = 15 * this.DEFAULT_UMA;
            exempt = Math.min(amount, limit);
        }

        const gravado = amount - exempt;

        return {
            key: satKey,
            concept: e.concept,
            gravado: gravado.toFixed(2),
            exento: exempt.toFixed(2),
            amount: amount.toFixed(2)
        };
    });

    const totalGravado = percepcionesData.reduce((sum: number, p: any) => sum + Number(p.gravado), 0).toFixed(2);
    const totalExento = percepcionesData.reduce((sum: number, p: any) => sum + Number(p.exento), 0).toFixed(2);

    const percepcionesNode = percepcionesData.length > 0 ? {
        '@_TotalSueldos': payroll.totalEarnings,
        '@_TotalGravado': totalGravado,
        '@_TotalExento': totalExento,
        'nomina12:Percepcion': percepcionesData.map((e: any) => ({
            '@_TipoPercepcion': e.key,
            '@_Clave': '001',
            '@_Concepto': e.concept,
            '@_ImporteGravado': e.gravado,
            '@_ImporteExento': e.exento
        }))
    } : undefined;

    const deductions = payroll.details.filter((d: any) => d.type === 'DEDUCTION');
    const deduccionesNode = deductions.length > 0 ? {
        '@_TotalOtrasDeducciones': '0.00',
        '@_TotalImpuestosRetenidos': deductions.filter((d: any) => d.concept.toLowerCase().includes('isr')).reduce((sum: number, d: any) => sum + Number(d.amount), 0).toFixed(2),
        'nomina12:Deduccion': deductions.map((d: any) => ({
            '@_TipoDeduccion': this.mapConceptToSatKey(d.concept, 'DEDUCTION'),
            '@_Clave': '002',
            '@_Concepto': d.concept,
            '@_Importe': d.amount
        }))
    } : undefined;

    const xmlObj = {
        'cfdi:Comprobante': {
            '@_xmlns:cfdi': 'http://www.sat.gob.mx/cfd/4',
            '@_xmlns:nomina12': 'http://www.sat.gob.mx/nomina12',
            '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '@_xsi:schemaLocation': 'http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd http://www.sat.gob.mx/nomina12 http://www.sat.gob.mx/sitio_internet/cfd/nomina/nomina12.xsd',
            '@_Version': '4.0',
            '@_Serie': 'NOM',
            '@_Folio': payroll.id.substring(0, 8),
            '@_Fecha': new Date().toISOString().split('.')[0],
            '@_Sello': '',
            '@_NoCertificado': tenantConfig.certificateNumber,
            '@_Certificado': tenantConfig.csdCertificate,
            '@_SubTotal': payroll.totalEarnings,
            '@_Descuento': payroll.totalDeductions,
            '@_Moneda': 'MXN',
            '@_Total': payroll.netPay,
            '@_TipoDeComprobante': 'N',
            '@_Exportacion': '01',
            '@_MetodoPago': 'PUE',
            '@_LugarExpedicion': tenantConfig.postalCode,
            'cfdi:Emisor': {
                '@_Rfc': tenantConfig.rfc,
                '@_Nombre': tenantConfig.legalName,
                '@_RegimenFiscal': tenantConfig.regime
            },
            'cfdi:Receptor': {
                '@_Rfc': payroll.employee.rfc || 'XAXX010101000',
                '@_Nombre': employeeName,
                '@_DomicilioFiscalReceptor': payroll.employee.postalCode || tenantConfig.postalCode,
                '@_RegimenFiscalReceptor': '605',
                '@_UsoCFDI': 'CN01'
            },
            'cfdi:Conceptos': {
                'cfdi:Concepto': {
                    '@_ClaveProdServ': '84111505',
                    '@_Cantidad': '1',
                    '@_ClaveUnidad': 'ACT',
                    '@_Descripcion': 'Pago de nómina',
                    '@_ValorUnitario': payroll.totalEarnings,
                    '@_Importe': payroll.totalEarnings,
                    '@_Descuento': payroll.totalDeductions,
                    '@_ObjetoImp': '01'
                }
            },
            'cfdi:Complemento': {
                'nomina12:Nomina': {
                    '@_Version': '1.2',
                    '@_TipoNomina': 'O',
                    '@_FechaPago': paymentDateStr,
                    '@_FechaInicialPago': periodStartStr,
                    '@_FechaFinalPago': periodEndStr,
                    '@_NumDiasPagados': '15.000',
                    '@_TotalPercepciones': payroll.totalEarnings,
                    '@_TotalDeducciones': payroll.totalDeductions,
                    'nomina12:Percepciones': percepcionesNode,
                    'nomina12:Deducciones': deduccionesNode,
                    'nomina12:Receptor': {
                        '@_Curp': payroll.employee.curp,
                        '@_TipoContrato': payroll.employee.contractType || '01',
                        '@_TipoRegimen': payroll.employee.regimeType || '02',
                        '@_NumEmpleado': payroll.employee.id.substring(0, 10),
                        '@_PeriodicidadPago': payroll.employee.periodicity || '04',
                        '@_ClaveEntFed': 'CMX'
                    }
                }
            }
        }
    };

    const xmlWithoutSello = builder.build(xmlObj);
    const xsltPath = 'libs/domain/fiscal/domain/src/lib/xslt/cadenaoriginal_4_0.xslt';
    let cadenaOriginal = '';
    try {
        cadenaOriginal = await this.xsltService.transform(xmlWithoutSello, xsltPath);
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        throw new Error(`Failed to generate Cadena Original for Payroll: ${message}`);
    }

    let sello = '';
    try {
        const sign = crypto.createSign('SHA256');
        sign.update(cadenaOriginal);
        sign.end();
        sello = sign.sign(tenantConfig.csdKey, 'base64');
    } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        throw new Error(`Failed to sign Payroll XML: ${message}`);
    }

    xmlObj['cfdi:Comprobante']['@_Sello'] = sello;
    return builder.build(xmlObj);
  }

  private mapConceptToSatKey(concept: string, type: 'EARNING' | 'DEDUCTION'): string {
      const c = concept.toLowerCase();
      if (type === 'EARNING') {
          if (c.includes('sueldo') || c.includes('salario')) return '001';
          if (c.includes('aguinaldo')) return '002';
          if (c.includes('vacacional')) return '020';
          return '038';
      } else {
          if (c.includes('isr')) return '002';
          if (c.includes('imss') || c.includes('seguro')) return '001';
          return '004';
      }
  }
}
