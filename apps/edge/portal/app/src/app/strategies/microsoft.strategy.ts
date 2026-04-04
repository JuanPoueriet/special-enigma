import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor() {
    const clientID = process.env['MICROSOFT_CLIENT_ID'];
    const clientSecret = process.env['MICROSOFT_CLIENT_SECRET'];
    const callbackURL = process.env['MICROSOFT_CALLBACK_URL'];

    if (!clientID || !clientSecret || !callbackURL) {
      throw new InternalServerErrorException(
        'Missing Microsoft OAuth configuration (MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, or MICROSOFT_CALLBACK_URL)',
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
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
