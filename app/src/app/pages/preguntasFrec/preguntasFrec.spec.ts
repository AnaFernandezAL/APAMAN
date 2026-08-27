import { ComponentFixture, TestBed } from '@angular/core/testing';

import { preguntasFrec } from './preguntasFrec';

describe('SobreNos', () => {
  let component: preguntasFrec;
  let fixture: ComponentFixture<preguntasFrec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [preguntasFrec],
    }).compileComponents();

    fixture = TestBed.createComponent(preguntasFrec);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});