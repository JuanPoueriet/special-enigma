import { Injectable } from '@angular/core';

export interface ContextSignal {
  source: 'url' | 'ip' | 'browser' | 'cookie';
  value: string;
  confidence: number;
}

export interface ContextAnalysis {
  action: 'proceed' | 'suggest' | 'confirm' | 'verify' | 'require_selection';
  detectedCountry: string;
  targetCountry: string;
  discrepancyLevel: 'none' | 'low' | 'medium' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class IntentDetectionService {

  constructor() {}

  analyzeContext(urlCountry: string): ContextAnalysis {
    const ipCountry = this.mockGeoIp();
    const browserLang = navigator.language; // e.g. 'en-US', 'es-CO'

    // Simple logic as per document
    let discrepancyLevel: 'none' | 'low' | 'medium' | 'high' = 'none';
    let action: ContextAnalysis['action'] = 'proceed';

    if (ipCountry === urlCountry) {
        return { action: 'proceed', detectedCountry: ipCountry, targetCountry: urlCountry, discrepancyLevel: 'none' };
    }

    // Logic for discrepancy
    if (this.areNeighbors(ipCountry, urlCountry)) {
        discrepancyLevel = 'low';
        action = 'suggest';
    } else if (this.sameRegion(ipCountry, urlCountry)) {
        discrepancyLevel = 'medium';
        action = 'confirm';
    } else {
        discrepancyLevel = 'high';
        action = 'verify';
    }

    return {
        action,
        detectedCountry: ipCountry,
        targetCountry: urlCountry,
        discrepancyLevel
    };
  }

  private mockGeoIp(): string {
      // Mock: Randomly return CO, MX, US to simulate different scenarios or just fixed for demo
      // Let's assume user is in 'CO' for now.
      return 'CO';
  }

  private areNeighbors(c1: string, c2: string): boolean {
      const neighbors: any = {
          'CO': ['VE', 'EC', 'PE', 'BR', 'PA'],
          'MX': ['US', 'GT', 'BZ'],
          'US': ['CA', 'MX']
      };
      return neighbors[c1]?.includes(c2) || neighbors[c2]?.includes(c1);
  }

  private sameRegion(c1: string, c2: string): boolean {
      // LatAm: CO, MX, BR, AR, PE, CL
      const latam = ['CO', 'MX', 'BR', 'AR', 'PE', 'CL'];
      const northAm = ['US', 'CA', 'MX']; // MX is in both geographically?

      if (latam.includes(c1) && latam.includes(c2)) return true;
      if (northAm.includes(c1) && northAm.includes(c2)) return true;

      return false;
  }
}
