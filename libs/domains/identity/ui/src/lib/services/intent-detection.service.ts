import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { ToastService, API_URL } from '@virteex/shared-ui';

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
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private apiUrl = inject(API_URL);
  private ipInfo$: Observable<{ country_code: string }>;

  constructor() {
    // Cache the IP info request
    // Call our backend proxy instead of external API directly
    this.ipInfo$ = this.http.get<{ country_code: string }>(`${this.apiUrl}/auth/location`).pipe(
        catchError(() => {
          // Silent fallback or less intrusive logging as per robust requirements
          console.warn('Unable to detect location via backend. Using default.');
          return of({ country_code: 'US' });
        }),
        shareReplay(1)
    );
  }

  analyzeContext(urlCountry: string): Observable<ContextAnalysis> {
    return this.ipInfo$.pipe(
        map(info => {
            const ipCountry = info.country_code || 'US';
            return this.calculateAnalysis(urlCountry.toUpperCase(), ipCountry.toUpperCase());
        })
    );
  }

  private calculateAnalysis(urlCountry: string, ipCountry: string): ContextAnalysis {
    let discrepancyLevel: 'none' | 'low' | 'medium' | 'high' = 'none';
    let action: ContextAnalysis['action'] = 'proceed';

    if (ipCountry === urlCountry) {
        return { action: 'proceed', detectedCountry: ipCountry, targetCountry: urlCountry, discrepancyLevel: 'none' };
    }

    if (this.areNeighbors(urlCountry, ipCountry)) {
        discrepancyLevel = 'low';
        action = 'suggest';
    } else if (this.sameRegion(urlCountry, ipCountry)) {
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

  private areNeighbors(c1: string, c2: string): boolean {
      const neighbors: Record<string, string[]> = {
          'CO': ['VE', 'EC', 'PE', 'BR', 'PA'],
          'VE': ['CO', 'BR', 'GY'],
          'EC': ['CO', 'PE'],
          'PE': ['EC', 'CO', 'BR', 'BO', 'CL'],
          'BR': ['CO', 'VE', 'GY', 'SR', 'GF', 'PE', 'BO', 'PY', 'AR', 'UY'],
          'PA': ['CO', 'CR'],
          'MX': ['US', 'GT', 'BZ'],
          'US': ['CA', 'MX'],
          'CA': ['US'],
          'AR': ['CL', 'BO', 'PY', 'BR', 'UY'],
          'CL': ['PE', 'BO', 'AR'],
      };
      return (neighbors[c1]?.includes(c2)) || (neighbors[c2]?.includes(c1)) || false;
  }

  private sameRegion(c1: string, c2: string): boolean {
      const latam = ['CO', 'MX', 'BR', 'AR', 'PE', 'CL', 'EC', 'VE', 'UY', 'PY', 'BO', 'GT', 'CR', 'PA', 'DO'];
      const northAm = ['US', 'CA', 'MX'];
      const europe = ['ES', 'FR', 'DE', 'IT', 'UK', 'PT'];

      const inRegion = (region: string[]) => region.includes(c1) && region.includes(c2);

      if (inRegion(latam)) return true;
      if (inRegion(northAm)) return true;
      if (inRegion(europe)) return true;

      return false;
  }
}
