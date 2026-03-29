import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-openidconnect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'okta') {
  constructor(configService: ConfigService) {
    const issuer = configService.get<string>('OKTA_ISSUER');
    const clientID = configService.get<string>('OKTA_CLIENT_ID');
    const clientSecret = configService.get<string>('OKTA_CLIENT_SECRET');

    if (!issuer || !clientID || !clientSecret) {
      throw new Error('Okta OAuth credentials are not fully configured');
    }

    super({
      issuer,
      authorizationURL: `${issuer}/v1/authorize`,
      tokenURL: `${issuer}/v1/token`,
      userInfoURL: `${issuer}/v1/userinfo`,
      clientID,
      clientSecret,
      callbackURL: configService.get<string>('OKTA_CALLBACK_URL') || 'http://localhost:3000/api/auth/okta/callback',
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(issuer: string, profile: any, done: (err: any, user: any) => void): Promise<any> {
    const user = {
      provider: 'okta',
      id: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name?.givenName || '',
      lastName: profile.name?.familyName || '',
    };
    done(null, user);
  }
}
