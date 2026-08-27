import { ComponentFixture, TestBed } from '@angular/core/testing';

import { comoAyudar } from './comoAyudar';

describe('comoAyudar', () => {
  let component: comoAyudar;
  let fixture: ComponentFixture<comoAyudar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [comoAyudar],
    }).compileComponents();

    fixture = TestBed.createComponent(comoAyudar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});