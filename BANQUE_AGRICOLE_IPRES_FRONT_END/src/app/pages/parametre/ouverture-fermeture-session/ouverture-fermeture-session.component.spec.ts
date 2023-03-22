import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvertureFermetureSessionComponent } from './ouverture-fermeture-session.component';

describe('OuvertureFermetureSessionComponent', () => {
  let component: OuvertureFermetureSessionComponent;
  let fixture: ComponentFixture<OuvertureFermetureSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuvertureFermetureSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuvertureFermetureSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
