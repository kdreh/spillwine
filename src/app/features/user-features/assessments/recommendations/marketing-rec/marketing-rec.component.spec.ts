import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarketingRecComponent} from './marketing-rec.component';

describe('MarketingRecComponent', () => {
  let component: MarketingRecComponent;
  let fixture: ComponentFixture<MarketingRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingRecComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MarketingRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
