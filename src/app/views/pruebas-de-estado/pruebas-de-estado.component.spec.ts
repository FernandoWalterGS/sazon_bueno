import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasDeEstadoComponent } from './pruebas-de-estado.component';

describe('PruebasDeEstadoComponent', () => {
  let component: PruebasDeEstadoComponent;
  let fixture: ComponentFixture<PruebasDeEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebasDeEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PruebasDeEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
