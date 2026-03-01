import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PosTerminalComponent } from './pos-terminal.component';

describe('PosTerminalComponent', () => {
  let component: PosTerminalComponent;
  let fixture: ComponentFixture<PosTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosTerminalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PosTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('POS Terminal');
  });
});
