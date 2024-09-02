import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StrategyResComponent} from './strategy-res.component';

describe('StrategyResComponent', () => {
  let component: StrategyResComponent;
  let fixture: ComponentFixture<StrategyResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategyResComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StrategyResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
