import { DomainException } from '@virtex/shared-util-server-server-config';

export class TaxIdValidator {
  validate(country: string, taxId: string): void {
    const countryCode = country.toUpperCase();
    let isValid = true;
    let errorMsg = '';

    switch (countryCode) {
      case 'CO': {
        const nit = taxId.replace(/[^0-9]/g, '');
        if (!/^\d{9,10}$/.test(nit)) {
          isValid = false;
          errorMsg = 'Invalid NIT for Colombia. Must be 9-10 digits.';
        }
        break;
      }
      case 'MX': {
        const rfc = taxId.toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (rfc.length < 12 || rfc.length > 13) {
             isValid = false;
             errorMsg = 'Invalid RFC for Mexico. Must be 12-13 alphanumeric characters.';
        } else if (!/^[A-Z&Ñ]{3,4}\d{6}[A-Z0-9]{3}$/.test(rfc)) {
             isValid = false;
             errorMsg = 'Invalid RFC format.';
        }
        break;
      }
      case 'US': {
        const ein = taxId.replace(/[^0-9]/g, '');
        if (!/^\d{9}$/.test(ein)) {
          isValid = false;
          errorMsg = 'Invalid EIN for USA. Must be 9 digits.';
        }
        break;
      }
      default:
        if (taxId.length < 5) {
            isValid = false;
            errorMsg = 'Tax ID too short.';
        }
        break;
    }

    if (!isValid) {
      throw new DomainException(errorMsg, 'BAD_REQUEST');
    }
  }
}
