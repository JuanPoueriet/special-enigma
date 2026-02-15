import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Sale, SaleItem, SaleRepository, SaleStatus, CustomerRepository } from '../../../../domain/src';
import { ProductRepository } from '@virteex/catalog-domain';
import {
  InventoryRepository,
  INVENTORY_REPOSITORY,
  WAREHOUSE_REPOSITORY,
  WarehouseRepository,
  InventoryMovement,
  InventoryMovementType,
  Stock,
  InsufficientStockException
} from '@virteex/inventory-domain';
import { CreateSaleDto } from '../dtos/create-sale.dto';
import Decimal from 'decimal.js';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly warehouseRepository: WarehouseRepository,
  ) {}

  async execute(dto: CreateSaleDto): Promise<Sale> {
    // 1. Validate Customer
    const customer = await this.customerRepository.findById(dto.customerId);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${dto.customerId} not found`);
    }

    // 2. Resolve Warehouse (Simple logic: pick first warehouse of tenant)
    // In a real scenario, this should come from context (e.g. current store) or DTO.
    const warehouses = await this.warehouseRepository.findAll(dto.tenantId);
    if (warehouses.length === 0) {
      throw new BadRequestException('No warehouse found for this tenant to fulfill the sale.');
    }
    const warehouse = warehouses[0]; // Naive selection

    let total = new Decimal(0);
    // Use customerName from resolved customer, and customerId from DTO.
    // Sale entity constructor: (tenantId, customerId, customerName, total)
    // Note: I updated Sale entity to have customerId in constructor.
    const sale = new Sale(dto.tenantId, dto.customerId, customer.companyName || `${customer.firstName} ${customer.lastName}`, '0');

    for (const item of dto.items) {
      // 3. Validate Product & Price
      const prodId = parseInt(item.productId, 10);
      if (isNaN(prodId)) {
           throw new BadRequestException(`Invalid product ID: ${item.productId}`);
      }
      const product = await this.productRepository.findById(prodId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      const price = new Decimal(product.price); // Trust backend price
      const quantity = new Decimal(item.quantity);

      // 4. Check Stock
      const stock = await this.inventoryRepository.findStock(warehouse.id, item.productId);
      if (!stock) {
        throw new InsufficientStockException(item.productId, warehouse.id);
      }

      const currentStock = new Decimal(stock.quantity);
      if (currentStock.lessThan(quantity)) {
         throw new InsufficientStockException(item.productId, warehouse.id);
      }

      // 5. Deduct Stock (Ideally transactional)
      // We are modifying stock here. In a robust system, this should be atomic.
      stock.removeQuantity(item.quantity.toString());
      await this.inventoryRepository.saveStock(stock);

      const movement = new InventoryMovement(
          dto.tenantId,
          item.productId,
          warehouse,
          InventoryMovementType.OUT,
          item.quantity.toString(),
          `Sale ${sale.id}`,
          undefined
      );
      await this.inventoryRepository.saveMovement(movement);

      // 6. Add to Sale
      const itemTotal = price.mul(quantity);
      total = total.plus(itemTotal);

      const saleItem = new SaleItem(
        item.productId,
        product.name,
        price.toString(),
        item.quantity.toString(),
      );
      sale.items.add(saleItem);
    }

    sale.total = total.toString();
    sale.status = SaleStatus.APPROVED; // Automatically approved as stock is deducted

    return this.saleRepository.create(sale);
  }
}
