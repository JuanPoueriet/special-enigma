import { Injectable } from '@nestjs/common';
import { RiskEngineService } from '@virteex/identity-domain';

@Injectable()
export class DefaultRiskEngineService implements RiskEngineService {
  async calculateRisk(context: { ip: string; country: string; userAgent: string; email?: string }): Promise<number> {
    let score = 0;

    // 1. IP vs Country mismatch (Mock logic)
    // In real world, we'd use GeoIP service.
    // Here, let's assume if IP starts with '190' it's Colombia (CO), '200' is Mexico (MX), etc.
    // Or just random logic for demo purposes if IP is not provided.

    const detectedCountry = this.mockGeoIp(context.ip);

    if (detectedCountry && detectedCountry !== context.country) {
        score += 50; // High risk if country mismatch
    }

    // 2. Email domain check (Mock)
    if (context.email && context.email.endsWith('gmail.com')) {
        score += 10; // Slightly higher risk for public email domains in B2B context
    }

    // 3. User Agent check
    if (!context.userAgent || context.userAgent.length < 10) {
        score += 20; // Suspicious UA
    }

    return Math.min(score, 100);
  }

  private mockGeoIp(ip: string): string {
      if (ip.startsWith('190')) return 'CO';
      if (ip.startsWith('200')) return 'MX';
      if (ip.startsWith('198')) return 'US';
      if (ip.startsWith('177')) return 'BR';
      return 'CO'; // Default to CO for now to minimize friction in local dev if no IP
  }
}
