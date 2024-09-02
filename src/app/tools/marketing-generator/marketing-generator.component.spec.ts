import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarketingGeneratorComponent} from './marketing-generator.component';

describe('MarketingGeneratorComponent', () => {
  let component: MarketingGeneratorComponent;
  let fixture: ComponentFixture<MarketingGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingGeneratorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MarketingGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
