import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contacto } from './contacto';

describe('contacto', () => {
  let component: contacto;
  let fixture: ComponentFixture<contacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [contacto],
    }).compileComponents();

    fixture = TestBed.createComponent(contacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});