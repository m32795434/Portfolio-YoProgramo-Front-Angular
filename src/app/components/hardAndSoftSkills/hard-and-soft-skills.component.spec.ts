import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardAndSoftSkillsComponent } from './hard-and-soft-skills.component';

describe('HardAndSoftSkillsComponent', () => {
  let component: HardAndSoftSkillsComponent;
  let fixture: ComponentFixture<HardAndSoftSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardAndSoftSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardAndSoftSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
