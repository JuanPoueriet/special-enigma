export interface UserReadPort {
  getUserCount(tenantId: string): Promise<number>;
}

export const USER_READ_PORT = Symbol('USER_READ_PORT');
