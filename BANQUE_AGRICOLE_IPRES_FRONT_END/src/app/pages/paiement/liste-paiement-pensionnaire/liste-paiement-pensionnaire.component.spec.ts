import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePaiementPensionnaireComponent } from './liste-paiement-pensionnaire.component';

describe('ListePaiementPensionnaireComponent', () => {
  let component: ListePaiementPensionnaireComponent;
  let fixture: ComponentFixture<ListePaiementPensionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePaiementPensionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePaiementPensionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
