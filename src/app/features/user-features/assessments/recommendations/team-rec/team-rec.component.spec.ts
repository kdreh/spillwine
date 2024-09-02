import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamRecComponent} from './team-rec.component';

describe('TeamRecComponent', () => {
  let component: TeamRecComponent;
  let fixture: ComponentFixture<TeamRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRecComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
