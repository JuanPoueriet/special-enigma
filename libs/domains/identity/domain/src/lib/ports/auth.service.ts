export abstract class AuthService {
  abstract hashPassword(password: string): Promise<string>;
  abstract verifyPassword(password: string, hash: string): Promise<boolean>;
  abstract generateToken(payload: any): Promise<string>;
  abstract verifyToken(token: string): Promise<any>; // Returns payload or throws
}
