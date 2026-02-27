import { v4 } from 'uuid';
import { SubscriptionPlan } from './subscription-plan.entity';

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
  PAST_DUE = 'PAST_DUE',
  PAYMENT_PENDING = 'PAYMENT_PENDING'
}

export class Subscription {
  id: string;
  tenantId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: SubscriptionStatus;
  externalSubscriptionId?: string;
  externalCustomerId?: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd = false;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(tenantId: string, planId: string, status: SubscriptionStatus = SubscriptionStatus.ACTIVE, id?: string) {
    this.id = id || v4();
    this.tenantId = tenantId;
    this.planId = planId;
    this.status = status;
    this.startDate = new Date();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  isValid(): boolean {
    const now = new Date();
    if (this.status !== SubscriptionStatus.ACTIVE && this.status !== SubscriptionStatus.TRIAL) {
      return false;
    }
    if (this.currentPeriodEnd && this.currentPeriodEnd < now) {
      return false;
    }
    if (this.endDate && !this.currentPeriodEnd && this.endDate < now) {
      return false;
    }
    return true;
  }

  markAsActive(externalSubId: string, currentPeriodEnd: Date) {
    this.status = SubscriptionStatus.ACTIVE;
    this.externalSubscriptionId = externalSubId;
    this.currentPeriodEnd = currentPeriodEnd;
    this.endDate = currentPeriodEnd;
  }

  markAsCanceled(atPeriodEnd: boolean) {
    this.cancelAtPeriodEnd = atPeriodEnd;
    if (!atPeriodEnd) {
      this.status = SubscriptionStatus.CANCELED;
      this.endDate = new Date();
    }
  }
}
