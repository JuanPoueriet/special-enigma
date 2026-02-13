import { DocumentValidator, ValidationResult } from './cpf.validator';

export class RFCValidator implements DocumentValidator {
  validate(rfc: string): ValidationResult {
    // RFC validation logic for Mexico
    // Persona Física: 4 letters, 6 numbers (YYMMDD), 3 chars (Homoclave) -> 13 chars
    // Persona Moral: 3 letters, 6 numbers (YYMMDD), 3 chars (Homoclave) -> 12 chars

    const rfcRegex = /^([A-ZÑ&]{3,4})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z0-9]{3})$/;

    if (!rfcRegex.test(rfc)) {
        return { valid: false, reason: 'invalid_format' };
    }

    // Validate Checksum (Digito Verificador) which is part of the Homoclave section
    if (!this.validateChecksum(rfc)) {
       return { valid: false, reason: 'invalid_checksum' };
    }

    return { valid: true };
  }

  private validateChecksum(rfc: string): boolean {
    const rfcFormatted = rfc.toUpperCase();
    const length = rfcFormatted.length;

    // Standard table for RFC
    const dictionary: {[key: string]: number} = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18,
        'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, '&': 24, 'O': 25, 'P': 26, 'Q': 27,
        'R': 28, 'S': 29, 'T': 30, 'U': 31, 'V': 32, 'W': 33, 'X': 34, 'Y': 35, 'Z': 36,
        ' ': 37, 'Ñ': 38
    };

    let sum = 0;

    // For Persona Moral (12 chars), we start weight at 13.
    // For Persona Fisica (13 chars), we start weight at 14.
    // EXCEPT the last char is the target checksum. We calculate up to len-1.

    const checkDigit = rfcFormatted.slice(-1);
    const body = rfcFormatted.slice(0, -1);

    let weight = length === 12 ? 13 : 14;

    for (let i = 0; i < body.length; i++) {
        const char = body[i];
        const val = dictionary[char];
        if (val === undefined) return false; // Should be caught by regex but safe guard
        sum += val * weight;
        weight--;
    }

    const remainder = sum % 11;
    let computedDigitValue = 0;

    if (remainder === 0) {
        computedDigitValue = 0;
    } else {
        computedDigitValue = 11 - remainder;
    }

    // Check digit comparison
    let computedChar = '';
    if (computedDigitValue === 10) {
        computedChar = 'A';
    } else {
        computedChar = computedDigitValue.toString();
    }

    return checkDigit === computedChar;
  }
}
