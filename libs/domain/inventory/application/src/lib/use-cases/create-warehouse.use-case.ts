import { Inject, Injectable } from '@nestjs/common';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { WAREHOUSE_REPOSITORY, type WarehouseRepository, Warehouse, DomainValidationError } from '@virteex/domain-inventory-domain';
import { EntitlementService } from '@virteex/kernel-entitlements';

export class CreateWarehouseDto {
  @IsUUID()
  @IsNotEmpty()
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsOptional()
  description?: string;
}

@Injectable()
export class CreateWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY) private readonly warehouseRepo: WarehouseRepository,
    private readonly entitlementService: EntitlementService
  ) {}

  async execute(dto: CreateWarehouseDto): Promise<Warehouse> {
    const existing = await this.warehouseRepo.findByCode(dto.code, dto.tenantId);
    if (existing) {
      throw new DomainValidationError('Warehouse code already exists');
    }

    const warehouses = await this.warehouseRepo.findAll(dto.tenantId);
    await this.entitlementService.checkQuota('branches', warehouses.length);

    const warehouse = new Warehouse(dto.tenantId, dto.code, dto.name);
    if (dto.description) {
      warehouse.changeDescription(dto.description);
    }

    await this.warehouseRepo.save(warehouse);
    return warehouse;
  }
}
