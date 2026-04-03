import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-okta-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy, 'okta') {
  constructor() {
    super({
      clientID: process.env['OKTA_CLIENT_ID'] || 'okta-id',
      clientSecret: process.env['OKTA_CLIENT_SECRET'] || 'okta-secret',
      callbackURL: process.env['OKTA_CALLBACK_URL'] || 'http://localhost:3000/api/portal/v1/auth/okta/callback',
      issuer: process.env['OKTA_ISSUER'] || 'https://dev-okta.okta.com/oauth2/default',
      scope: ['openid', 'email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any) => void,
  ): Promise<any> {
    const { id, emails, name } = profile;
    const user = {
      id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      provider: 'okta',
    };
    done(null, user);
  }
}
