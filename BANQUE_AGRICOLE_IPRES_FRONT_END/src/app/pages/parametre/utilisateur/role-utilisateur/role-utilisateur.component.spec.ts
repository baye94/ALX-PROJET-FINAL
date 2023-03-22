import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUtilisateurComponent } from './role-utilisateur.component';

describe('RoleUtilisateurComponent', () => {
  let component: RoleUtilisateurComponent;
  let fixture: ComponentFixture<RoleUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
