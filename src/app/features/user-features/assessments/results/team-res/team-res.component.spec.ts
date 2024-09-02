import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamResComponent} from './team-res.component';

describe('TeamResComponent', () => {
  let component: TeamResComponent;
  let fixture: ComponentFixture<TeamResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamResComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
