import { CashDrawerPort } from '@virteex/domain-pos-application';

export class DesktopCashDrawerAdapter implements CashDrawerPort {
  async openDrawer(): Promise<{ success: boolean; error?: string }> {
    console.log('Opening desktop cash drawer');
    return { success: true };
  }
}
