import { Inject, Injectable } from '@nestjs/common';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, IsNumberString } from 'class-validator';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
  WAREHOUSE_REPOSITORY,
  WarehouseRepository,
  InventoryMovement,
  Stock,
  InventoryMovementType
} from '@virteex-erp/inventory-domain';

export class RegisterMovementDto {
  @IsUUID()
  @IsNotEmpty()
  tenantId!: string;

  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsUUID()
  @IsNotEmpty()
  warehouseId!: string;

  @IsUUID()
  @IsOptional()
  locationId?: string;

  @IsEnum(InventoryMovementType)
  @IsNotEmpty()
  type!: InventoryMovementType;

  @IsNumberString()
  @IsNotEmpty()
  quantity!: string;

  @IsString()
  @IsNotEmpty()
  reference!: string;
}

@Injectable()
export class RegisterMovementUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepo: InventoryRepository,
    @Inject(WAREHOUSE_REPOSITORY) private readonly warehouseRepo: WarehouseRepository
  ) {}

  async execute(dto: RegisterMovementDto): Promise<void> {
    // 1. Validate Warehouse
    const warehouse = await this.warehouseRepo.findById(dto.warehouseId);
    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    // Strict Tenant Check
    if (warehouse.tenantId !== dto.tenantId) {
       throw new Error('Warehouse does not belong to tenant');
    }

    // 2. Validate Location if provided
    let location;
    if (dto.locationId) {
      location = await this.warehouseRepo.findLocationById(dto.locationId);
      if (!location) {
        throw new Error('Location not found');
      }
      if (location.tenantId !== dto.tenantId) {
         throw new Error('Location does not belong to tenant');
      }
    }

    // 3. Find Stock
    let stock = await this.inventoryRepo.findStock(
      dto.warehouseId,
      dto.productId,
      dto.locationId
    );

    // 4. Create Stock if not exists
    if (!stock) {
      if (dto.type === InventoryMovementType.OUT) {
         throw new Error('Insufficient stock (No stock record)');
      }
      stock = new Stock(dto.tenantId, dto.productId, warehouse, '0', location || undefined);
    } else {
        // Ensure stock belongs to tenant (sanity check)
        if (stock.tenantId !== dto.tenantId) {
            throw new Error('Stock record tenant mismatch');
        }
    }

    // 5. Update Stock
    if (dto.type === InventoryMovementType.IN) {
      stock.addQuantity(dto.quantity);
    } else if (dto.type === InventoryMovementType.OUT) {
      stock.removeQuantity(dto.quantity);
    }

    // 6. Create Movement
    const movement = new InventoryMovement(
      dto.tenantId,
      dto.productId,
      warehouse,
      dto.type,
      dto.quantity,
      dto.reference,
      location || undefined
    );

    // 7. Save
    await this.inventoryRepo.saveStock(stock);
    await this.inventoryRepo.saveMovement(movement);
  }
}
