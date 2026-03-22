export enum JobStatus {
  PENDING = 'PENDING',
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED_RETRYABLE = 'FAILED_RETRYABLE',
  FAILED_TERMINAL = 'FAILED_TERMINAL',
  RETRY_SCHEDULED = 'RETRY_SCHEDULED'
}

export class Job {
  id!: string;
  type!: string;
  payload!: any;
  status: JobStatus = JobStatus.PENDING;
  tenantId!: string;
  attempts: number = 0;
  maxAttempts: number = 3;
  lastError?: string;
  priority: number = 0;
  scheduledAt?: Date;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
