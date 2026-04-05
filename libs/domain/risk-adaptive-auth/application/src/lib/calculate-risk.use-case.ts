
import { Injectable } from '@nestjs/common';

export interface RiskRequest {
  userId: string;
  ipAddress: string;
  userAgent: string;
  email: string;
}

@Injectable()
export class CalculateRiskUseCase {
  async execute(request: RiskRequest) {
    // Risk evaluation logic
    const score = 0.1;
    return {
      score,
      stepUpRequired: score > 0.7,
    };
  }
}
