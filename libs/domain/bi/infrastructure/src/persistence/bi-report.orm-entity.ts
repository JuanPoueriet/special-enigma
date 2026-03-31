import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BiReport } from '@virteex/domain-bi-domain';

@Entity({ schema: 'bi', tableName: 'bi_report' })
export class BiReportRecord {
  @PrimaryKey()
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  name!: string;

  @Property()
  type!: string;

  @Property({ type: 'json' })
  data: any;

  @Property()
  createdAt!: Date;

  static fromDomain(report: BiReport): BiReportRecord {
    const record = new BiReportRecord();
    record.id = report.id;
    record.tenantId = report.tenantId;
    record.name = report.name;
    record.type = report.type;
    record.data = report.data;
    record.createdAt = report.createdAt;
    return record;
  }

  toDomain(): BiReport {
    return new BiReport(
      this.tenantId,
      this.name,
      this.type,
      this.data,
      this.id,
      this.createdAt
    );
  }
}
