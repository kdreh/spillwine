import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StrategyRecComponent} from './strategy-rec.component';

describe('StrategyRecComponent', () => {
  let component: StrategyRecComponent;
  let fixture: ComponentFixture<StrategyRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategyRecComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StrategyRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
