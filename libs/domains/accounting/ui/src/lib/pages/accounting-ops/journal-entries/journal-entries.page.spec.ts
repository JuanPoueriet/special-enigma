import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntries } from '@virteex/accounting-ui/lib/pages/accounting-ops/journal-entries/journal-entries.page';

describe('JournalEntries', () => {
  let component: JournalEntries;
  let fixture: ComponentFixture<JournalEntries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalEntries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalEntries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
