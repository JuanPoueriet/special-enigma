import { Module, Global } from '@nestjs/common';
import { JobProcessorService } from './job-processor.service';
import { JobOrchestrator } from './job-orchestrator';
import { SchedulerService } from './scheduler.service';
import { JOB_HANDLER_REGISTRY } from './ports/job-handler.port';

@Global()
@Module({
  imports: [],
  providers: [
    JobProcessorService,
    JobOrchestrator,
    SchedulerService,
    {
      provide: JOB_HANDLER_REGISTRY,
      useValue: new Map(),
    }
  ],
  exports: [SchedulerService, JobOrchestrator, JobProcessorService, JOB_HANDLER_REGISTRY],
})
export class SchedulerApplicationModule {}
