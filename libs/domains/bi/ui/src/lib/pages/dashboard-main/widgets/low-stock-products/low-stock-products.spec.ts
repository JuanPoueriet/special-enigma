import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockProducts } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/low-stock-products/low-stock-products';

describe('LowStockProducts', () => {
  let component: LowStockProducts;
  let fixture: ComponentFixture<LowStockProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowStockProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
