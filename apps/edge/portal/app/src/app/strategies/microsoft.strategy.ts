import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor() {
    super({
      clientID: process.env['MICROSOFT_CLIENT_ID'] || 'microsoft-id',
      clientSecret: process.env['MICROSOFT_CLIENT_SECRET'] || 'microsoft-secret',
      callbackURL: process.env['MICROSOFT_CALLBACK_URL'] || 'http://localhost:3000/api/portal/v1/auth/microsoft/callback',
      scope: ['user.read'],
      tenant: 'common',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any) => void,
  ): Promise<any> {
    const { id, emails, displayName } = profile;
    const names = displayName.split(' ');
    const user = {
      id,
      email: emails?.[0]?.value || profile.userPrincipalName,
      firstName: names[0],
      lastName: names.slice(1).join(' '),
      provider: 'microsoft',
    };
    done(null, user);
  }
}
