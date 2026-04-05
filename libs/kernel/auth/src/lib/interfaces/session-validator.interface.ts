export const SESSION_VALIDATOR = Symbol('SESSION_VALIDATOR');

export interface SessionValidator {
  isValid(sessionId: string): Promise<boolean>;
}
