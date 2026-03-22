import { v4 } from 'uuid';

export enum ConsentSource {
  ONBOARDING = 'onboarding',
  PROFILE_UPDATE = 'profile_update',
  EXTERNAL_SYNC = 'external_sync',
}

export class ConsentLedger {
  id: string = v4();
  tenantId!: string;
  userId!: string;
  channel!: string;
  category!: string;
  isOptedIn: boolean = true;
  source!: ConsentSource;
  occurredAt: Date = new Date();
  termsVersion?: string;
  metadata?: Record<string, any>;
}

export class NotificationPreference {
  id: string = v4();
  tenantId!: string;
  userId!: string;
  preferences!: Record<string, any>;
  quietHours?: {
    enabled: boolean;
    timezone: string;
    start: string; // HH:mm
    end: string;   // HH:mm
  };
  updatedAt: Date = new Date();
}
