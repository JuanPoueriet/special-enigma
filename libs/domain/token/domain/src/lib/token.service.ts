
export class TokenService {
  async generateAccessToken(payload: any) {
    throw new Error('Not implemented: Use kernel-auth JwtTokenService instead.');
  }

  async generateRefreshToken(payload: any) {
    throw new Error('Not implemented: Use kernel-auth JwtTokenService instead.');
  }

  async publishJwks() {
    throw new Error('Not implemented: Use kernel-auth JwtTokenService instead.');
  }
}
