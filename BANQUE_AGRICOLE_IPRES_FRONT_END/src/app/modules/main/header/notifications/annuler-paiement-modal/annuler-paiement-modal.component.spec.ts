import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerPaiementModalComponent } from './annuler-paiement-modal.component';

describe('AnnulerPaiementModalComponent', () => {
  let component: AnnulerPaiementModalComponent;
  let fixture: ComponentFixture<AnnulerPaiementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnulerPaiementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnulerPaiementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
