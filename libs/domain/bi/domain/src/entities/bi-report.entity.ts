import { v4 as uuidv4 } from 'uuid';

export class BiReport {
  readonly id: string;
  readonly tenantId: string;
  readonly name: string;
  readonly type: string;
  readonly data: any;
  readonly createdAt: Date;

  constructor(
    tenantId: string,
    name: string,
    type: string,
    data: any,
    id?: string,
    createdAt?: Date
  ) {
    this.tenantId = tenantId;
    this.name = name;
    this.type = type;
    this.data = data;
    this.id = id || uuidv4();
    this.createdAt = createdAt || new Date();
  }
}
