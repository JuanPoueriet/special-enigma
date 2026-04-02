import { Test, TestingModule } from '@nestjs/testing';
import { ProcessSaleUseCase } from '../process-sale.use-case';
import { PosRepository, PosSaleStatus, HARDWARE_BRIDGE_PORT, HardwareBridgePort } from '@virtex/domain-pos-domain';
import { POS_INVENTORY_PORT, PosInventoryPort, POS_BILLING_PORT, PosBillingPort } from '../../ports/pos-integration.ports';
import { vi, Mock } from 'vitest';

describe('ProcessSaleUseCase', () => {
  let useCase: ProcessSaleUseCase;
  let posRepository: PosRepository;
  let hardwareBridge: HardwareBridgePort;
  let inventoryPort: PosInventoryPort;
  let billingPort: PosBillingPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessSaleUseCase,
        {
          provide: 'PosRepository',
          useValue: { saveSale: vi.fn() }
        },
        {
          provide: HARDWARE_BRIDGE_PORT,
          useValue: { printTicket: vi.fn().mockResolvedValue({ success: true }), openDrawer: vi.fn().mockResolvedValue({ success: true }) }
        },
        {
          provide: POS_INVENTORY_PORT,
          useValue: { reserveStock: vi.fn().mockResolvedValue(undefined) }
        },
        {
          provide: POS_BILLING_PORT,
          useValue: { createInvoice: vi.fn().mockResolvedValue({ id: 'inv_123' }) }
        }
      ]
    }).compile();

    useCase = module.get<ProcessSaleUseCase>(ProcessSaleUseCase);
    posRepository = module.get<PosRepository>('PosRepository');
    hardwareBridge = module.get<HardwareBridgePort>(HARDWARE_BRIDGE_PORT);
    inventoryPort = module.get<PosInventoryPort>(POS_INVENTORY_PORT);
    billingPort = module.get<PosBillingPort>(POS_BILLING_PORT);
  });

  it('should process a sale successfully with inventory and billing integration', async () => {
    const saleData = {
      terminalId: 'term_1',
      total: '100.00',
      warehouseId: 'wh_1',
      items: [
        { productId: 'prod_1', productName: 'Test Product', price: '100.00', quantity: 1 }
      ]
    };

    const result = await useCase.execute('tenant_1', 'term_1', saleData);

    expect(result.status).toBe(PosSaleStatus.PAID);
    expect(posRepository.saveSale).toHaveBeenCalled();
    expect(inventoryPort.reserveStock).toHaveBeenCalled();
    expect(billingPort.createInvoice).toHaveBeenCalled();
    expect(hardwareBridge.printTicket).toHaveBeenCalled();
    expect(hardwareBridge.openDrawer).toHaveBeenCalled();
  });

  it('should cancel sale and throw error if inventory reservation fails', async () => {
    (inventoryPort.reserveStock as Mock).mockRejectedValue(new Error('Out of stock'));

    const saleData = {
      terminalId: 'term_1',
      total: '100.00',
      items: [{ productId: 'prod_1', quantity: 10 }]
    };

    await expect(useCase.execute('tenant_1', 'term_1', saleData)).rejects.toThrow('Out of stock');
    expect(posRepository.saveSale).toHaveBeenCalledWith(expect.objectContaining({ status: PosSaleStatus.CANCELLED }));
  });
});
