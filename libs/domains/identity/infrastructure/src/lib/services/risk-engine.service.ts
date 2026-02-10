import { Injectable, Logger } from '@nestjs/common';
import { RiskEngineService } from '@virteex/identity-domain';

@Injectable()
export class DefaultRiskEngineService implements RiskEngineService {
  private readonly logger = new Logger(DefaultRiskEngineService.name);

  // Simple heuristic for disposable email domains
  private readonly DISPOSABLE_DOMAINS = [
    'guerrillamail.com',
    'mailinator.com',
    'yopmail.com',
    'temp-mail.org',
    '10minutemail.com',
    'sharklasers.com',
    'dispostable.com',
    'getairmail.com',
    'maildrop.cc'
  ];

  // Simple heuristic for suspicious User Agents
  private readonly SUSPICIOUS_UA_PATTERNS = [
    /curl/i,
    /wget/i,
    /python-requests/i,
    /PostmanRuntime/i,
    /HeadlessChrome/i,
    /PhantomJS/i
  ];

  async calculateRisk(context: { ip: string; country?: string; userAgent?: string; email?: string }): Promise<number> {
    let score = 0;

    // 1. IP Logic
    // In a real scenario, we would use a GeoIP database (MaxMind) here.
    // Since we cannot integrate external paid APIs here, we skip fake "190.x.x.x" checks.
    // However, we can check for local/private IPs if needed, but for now we trust the gateway passed IP.

    // 2. Email Domain Check (Real Heuristic)
    if (context.email) {
      const emailDomain = context.email.split('@')[1]?.toLowerCase();
      if (emailDomain) {
        if (this.DISPOSABLE_DOMAINS.includes(emailDomain)) {
          this.logger.warn(`High risk detected: Disposable email domain ${emailDomain}`);
          score += 90; // Immediate high risk
        }

        // Check for public free email providers in a B2B context
        if (['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(emailDomain)) {
             score += 10; // Slight bump for non-corporate email
        }
      }
    }

    // 3. User Agent Check (Real Heuristic)
    if (context.userAgent) {
      if (context.userAgent.length < 20) {
        score += 30; // Very short UA is suspicious
      }

      for (const pattern of this.SUSPICIOUS_UA_PATTERNS) {
        if (pattern.test(context.userAgent)) {
          this.logger.warn(`Suspicious User Agent detected: ${context.userAgent}`);
          score += 50;
          break;
        }
      }
    } else {
        // Missing User Agent is highly suspicious
        score += 40;
    }

    return Math.min(score, 100);
  }
}
