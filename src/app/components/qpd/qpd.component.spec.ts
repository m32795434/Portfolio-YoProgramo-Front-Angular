import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QPDComponent } from './qpd.component';

describe('QPDComponent', () => {
  let component: QPDComponent;
  let fixture: ComponentFixture<QPDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QPDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QPDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
