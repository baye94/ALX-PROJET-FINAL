import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenaireAgenceGuichetComponent } from './partenaire-agence-guichet.component';

describe('PartenaireAgenceGuichetComponent', () => {
  let component: PartenaireAgenceGuichetComponent;
  let fixture: ComponentFixture<PartenaireAgenceGuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartenaireAgenceGuichetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartenaireAgenceGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
