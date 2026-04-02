import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, Observable } from 'rxjs';
import { CATALOG_PACKAGE, CATALOG_PROTO_PATH } from '@virtex/shared-proto';
import { type CatalogService, type Product } from '@virtex/domain-crm-domain';

interface CatalogGrpcService {
  getProductById(data: { id: number; tenantId: string }): Observable<Product>;
}

@Injectable()
export class GrpcCatalogAdapter implements CatalogService, OnModuleInit {
  private readonly logger = new Logger(GrpcCatalogAdapter.name);
  private catalogGrpcService: CatalogGrpcService | null = null;
  private client: ClientGrpc;

  constructor(private readonly configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: CATALOG_PACKAGE,
        protoPath: CATALOG_PROTO_PATH,
        url: this.configService.get<string>('CATALOG_GRPC_URL', 'virtex-catalog-service:50054'),
      },
    }) as any;
  }

  onModuleInit() {
    this.catalogGrpcService = this.client.getService<CatalogGrpcService>('CatalogService');
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      if (!this.catalogGrpcService) {
          throw new Error('Catalog gRPC service not initialized');
      }
      // Note: tenantId should ideally come from context
      const product = await firstValueFrom(
        this.catalogGrpcService.getProductById({ id, tenantId: 'system' })
      );
      return product;
    } catch (error: any) {
      this.logger.error(`Failed to fetch product ${id} via gRPC: ${error.message}`);
      return null;
    }
  }
}
