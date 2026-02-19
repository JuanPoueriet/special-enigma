import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductionOrderUseCase, CreateProductionOrderDto } from './create-production-order.use-case';
import {
  PRODUCTION_ORDER_REPOSITORY,
  INVENTORY_SERVICE,
  BILL_OF_MATERIALS_REPOSITORY,
  ProductionOrderRepository,
  InventoryService,
  BillOfMaterialsRepository,
  BillOfMaterials,
  BillOfMaterialsComponent
} from '@virteex/manufacturing-domain';
import { NotFoundException } from '@nestjs/common';
import { Collection } from '@mikro-orm/core';

describe('CreateProductionOrderUseCase', () => {
  let useCase: CreateProductionOrderUseCase;
  let productionOrderRepo: jest.Mocked<ProductionOrderRepository>;
  let inventoryService: jest.Mocked<InventoryService>;
  let bomRepo: jest.Mocked<BillOfMaterialsRepository>;

  beforeEach(async () => {
    productionOrderRepo = {
      save: jest.fn(),
      findAll: jest.fn(),
    } as any;

    inventoryService = {
      checkAndReserveStock: jest.fn(),
    } as any;

    bomRepo = {
      findByProductSku: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductionOrderUseCase,
        { provide: PRODUCTION_ORDER_REPOSITORY, useValue: productionOrderRepo },
        { provide: INVENTORY_SERVICE, useValue: inventoryService },
        { provide: BILL_OF_MATERIALS_REPOSITORY, useValue: bomRepo },
      ],
    }).compile();

    useCase = module.get<CreateProductionOrderUseCase>(CreateProductionOrderUseCase);
  });

  it('should create production order and reserve component stock', async () => {
    const dto: CreateProductionOrderDto = {
      tenantId: 'tenant1',
      warehouseId: 'wh1',
      productSku: 'FINISHED_GOOD',
      quantity: 10,
      dueDate: new Date(),
    };

    const mockBom = {
      id: 'bom1',
      components: [
        { componentProductSku: 'RAW_MAT_A', quantity: 2 }, // 10 * 2 = 20
        { componentProductSku: 'RAW_MAT_B', quantity: 1 }  // 10 * 1 = 10
      ]
    } as any;

    bomRepo.findByProductSku.mockResolvedValue(mockBom);
    inventoryService.checkAndReserveStock.mockResolvedValue();

    const result = await useCase.execute(dto);

    // Should verify BOM exists
    expect(bomRepo.findByProductSku).toHaveBeenCalledWith('FINISHED_GOOD');

    // Should reserve stock for components
    expect(inventoryService.checkAndReserveStock).toHaveBeenCalledTimes(2);
    expect(inventoryService.checkAndReserveStock).toHaveBeenCalledWith('tenant1', 'wh1', 'RAW_MAT_A', 20);
    expect(inventoryService.checkAndReserveStock).toHaveBeenCalledWith('tenant1', 'wh1', 'RAW_MAT_B', 10);

    // Should create order
    expect(productionOrderRepo.save).toHaveBeenCalled();
    expect(result.productSku).toBe('FINISHED_GOOD');
  });

  it('should throw NotFoundException when BOM does not exist', async () => {
    const dto: CreateProductionOrderDto = {
      tenantId: 'tenant1',
      warehouseId: 'wh1',
      productSku: 'SKU123',
      quantity: 10,
      dueDate: new Date(),
    };

    bomRepo.findByProductSku.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(NotFoundException);
    expect(inventoryService.checkAndReserveStock).not.toHaveBeenCalled();
    expect(productionOrderRepo.save).not.toHaveBeenCalled();
  });
});
