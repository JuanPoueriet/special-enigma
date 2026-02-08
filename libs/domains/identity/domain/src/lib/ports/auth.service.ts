export abstract class AuthService {
  abstract hashPassword(password: string): Promise<string>;
  abstract verifyPassword(password: string, hash: string): Promise<boolean>;
  abstract generateToken(payload: any): Promise<string>;
}
