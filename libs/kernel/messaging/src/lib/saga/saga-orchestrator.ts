import { Injectable, Logger } from '@nestjs/common';

export interface SagaStep<T> {
  name: string;
  invoke(context: T): Promise<void>;
  compensate(context: T): Promise<void>;
}

export abstract class Saga<T> {
  protected steps: SagaStep<T>[] = [];

  constructor(public readonly context: T) {}

  addStep(step: SagaStep<T>): void {
    this.steps.push(step);
  }

  getSteps(): SagaStep<T>[] {
    return this.steps;
  }
}

@Injectable()
export class SagaOrchestrator {
  private readonly logger = new Logger(SagaOrchestrator.name);

  /**
   * Executes a Saga.
   * Note: Currently uses in-memory execution. In a production environment with high reliability requirements,
   * this should be enhanced to persist the saga state (current step, context) to a durable store (DB/Redis)
   * after each step to allow recovery from crashes.
   */
  async execute<T>(saga: Saga<T>): Promise<void> {
    const executedSteps: SagaStep<T>[] = [];
    const steps = saga.getSteps();
    const sagaId = `saga-${Date.now()}`; // logic to generate ID

    this.logger.log(`Starting Saga execution ${sagaId} with ${steps.length} steps`);

    try {
      for (const step of steps) {
        await this.persistState(sagaId, { step: step.name, status: 'STARTED' });

        this.logger.debug(`Executing step: ${step.name}`);
        await step.invoke(saga.context);
        executedSteps.push(step);

        await this.persistState(sagaId, { step: step.name, status: 'COMPLETED' });
      }
      this.logger.log(`Saga ${sagaId} completed successfully`);
    } catch (error) {
      this.logger.error(`Saga ${sagaId} step failed, initiating compensation...`, error);
      // Compensate in reverse order
      for (const step of executedSteps.reverse()) {
        this.logger.warn(`Compensating step: ${step.name}`);
        try {
          await step.compensate(saga.context);
          await this.persistState(sagaId, { step: step.name, status: 'COMPENSATED' });
        } catch (compError) {
          this.logger.error(`Compensation failed for step ${step.name}`, compError);
          // In production, this should probably alert or save to a dead-letter queue for manual intervention
        }
      }
      throw error;
    }
  }

  private async persistState(id: string, state: any): Promise<void> {
    // Stub for persistence logic.
    // In a real implementation: await this.repository.save({ id, state });
    this.logger.verbose(`[Persistence Stub] Saved state for ${id}: ${JSON.stringify(state)}`);
  }
}
