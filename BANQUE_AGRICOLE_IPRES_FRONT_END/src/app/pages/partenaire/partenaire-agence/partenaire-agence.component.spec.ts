import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenaireAgenceComponent } from './partenaire-agence.component';

describe('PartenaireAgenceComponent', () => {
  let component: PartenaireAgenceComponent;
  let fixture: ComponentFixture<PartenaireAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartenaireAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartenaireAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
