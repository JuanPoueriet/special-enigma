import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearch } from '@virteex/shared-ui/lib/components/global-search/global-search.page';

describe('GlobalSearch', () => {
  let component: GlobalSearch;
  let fixture: ComponentFixture<GlobalSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
