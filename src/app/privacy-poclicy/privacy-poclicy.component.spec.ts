import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPoclicyComponent } from './privacy-poclicy.component';

describe('PrivacyPoclicyComponent', () => {
  let component: PrivacyPoclicyComponent;
  let fixture: ComponentFixture<PrivacyPoclicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPoclicyComponent]
    });
    fixture = TestBed.createComponent(PrivacyPoclicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
