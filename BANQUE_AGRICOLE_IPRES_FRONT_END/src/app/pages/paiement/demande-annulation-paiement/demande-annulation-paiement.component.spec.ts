import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAnnulationPaiementComponent } from './demande-annulation-paiement.component';

describe('DemandeAnnulationPaiementComponent', () => {
  let component: DemandeAnnulationPaiementComponent;
  let fixture: ComponentFixture<DemandeAnnulationPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAnnulationPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAnnulationPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
