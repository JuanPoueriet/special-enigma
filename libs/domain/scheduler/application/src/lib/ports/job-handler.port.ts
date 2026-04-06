import { Job } from '@virtex/domain-scheduler-domain';

export interface JobHandler {
  handle(job: Job): Promise<void>;
}

export const JOB_HANDLER_REGISTRY = 'JOB_HANDLER_REGISTRY';
