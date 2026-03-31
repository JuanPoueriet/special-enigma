import { FinOpsService } from './finops.service';
import { USAGE_REPOSITORY } from './ports/usage.repository';

export class FinOpsModule {
  static getProviders() {
    return [
      FinOpsService,
    ];
  }
}

export { USAGE_REPOSITORY };
