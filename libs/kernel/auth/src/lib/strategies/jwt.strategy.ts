import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtTokenService } from '../services/jwt-token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtTokenService: JwtTokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.['access_token'] || null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKeyProvider: (_request: Request, rawJwtToken: string, done: (err: Error | null, secret?: string | Buffer) => void) => {
        try {
          done(null, this.jwtTokenService.getVerificationSecretForToken(rawJwtToken));
        } catch (error: unknown) {
          const err = error instanceof Error ? error : new Error(String(error));
          done(err);
        }
      },
      algorithms: ['HS256', 'HS384', 'HS512', 'RS256', 'ES256'],
    });
  }

  async validate(request: Request, _payload: unknown) {
    const token = request?.cookies?.['access_token'] || request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    return await this.jwtTokenService.verifyToken(token, 'access');
  }
}
