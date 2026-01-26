export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export interface DocumentValidator {
  validate(value: string): ValidationResult;
}

export class CPFValidator implements DocumentValidator {
  validate(cpf: string): ValidationResult {
    // Remove formatting
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    // Basic validation
    if (cleanCPF.length !== 11) {
      return { valid: false, reason: 'invalid_length' };
    }

    // Check for known invalid patterns
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return { valid: false, reason: 'invalid_pattern' };
    }

    // Calculate verification digits
    const digits = cleanCPF.split('').map(Number);
    const calcDigit = (slice: number[]) => {
      let sum = 0;
      for (let i = 0; i < slice.length; i++) {
        sum += slice[i] * (slice.length + 1 - i);
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstDigit = calcDigit(digits.slice(0, 9));
    if (firstDigit !== digits[9]) {
      return { valid: false, reason: 'invalid_first_digit' };
    }

    const secondDigit = calcDigit(digits.slice(0, 10));
    if (secondDigit !== digits[10]) {
      return { valid: false, reason: 'invalid_second_digit' };
    }

    return { valid: true };
  }
}
