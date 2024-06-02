import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickBookingComponent } from './quickbooking.component';

describe('QuickbookingComponent', () => {
  let component: QuickBookingComponent;
  let fixture: ComponentFixture<QuickBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickBookingComponent]
    });
    fixture = TestBed.createComponent(QuickBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
