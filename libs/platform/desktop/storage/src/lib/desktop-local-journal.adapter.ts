import { LocalJournalPort } from '@virteex/domain-pos-application';

export class DesktopLocalJournalAdapter implements LocalJournalPort {
  private entries: any[] = [];

  async appendEntry(entry: any): Promise<{ success: boolean; entryId: string }> {
    const entryId = Math.random().toString(36).substring(7);
    const newEntry = { ...entry, id: entryId, timestamp: new Date() };
    this.entries.push(newEntry);
    console.log('Appended to desktop journal:', newEntry);
    return { success: true, entryId };
  }

  async getEntries(limit?: number): Promise<any[]> {
    return limit ? this.entries.slice(-limit) : this.entries;
  }
}
