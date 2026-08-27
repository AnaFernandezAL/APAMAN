import { ComponentFixture, TestBed } from '@angular/core/testing';

import { proyectos } from './proyectos';

describe('SobreNos', () => {
  let component: proyectos;
  let fixture: ComponentFixture<proyectos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [proyectos],
    }).compileComponents();

    fixture = TestBed.createComponent(proyectos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});