import { Account } from '@virteex-erp/accounting-domain';
import { AccountDto } from '@virteex-erp/accounting-contracts';

export class AccountMapper {
  static toDto(entity: Account): AccountDto {
    return {
      id: entity.id,
      tenantId: entity.tenantId,
      code: entity.code,
      name: entity.name,
      type: entity.type,
      level: entity.level,
      isControl: entity.isControl,
      currency: entity.currency,
      parentId: entity.parent?.id
    };
  }
}
