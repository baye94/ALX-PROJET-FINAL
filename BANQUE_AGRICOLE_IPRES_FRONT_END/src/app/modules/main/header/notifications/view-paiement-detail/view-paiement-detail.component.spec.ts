import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaiementDetailComponent } from './view-paiement-detail.component';

describe('ViewPaiementDetailComponent', () => {
  let component: ViewPaiementDetailComponent;
  let fixture: ComponentFixture<ViewPaiementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPaiementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPaiementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
