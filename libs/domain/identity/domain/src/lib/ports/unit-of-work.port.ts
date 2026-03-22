export interface UnitOfWorkPort {
  runInTransaction<T>(work: () => Promise<T>): Promise<T>;
}

export const UNIT_OF_WORK_PORT = 'UNIT_OF_WORK_PORT';
