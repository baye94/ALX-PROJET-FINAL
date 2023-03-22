import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionnaireComponent } from './pensionnaire.component';

describe('PensionnaireComponent', () => {
  let component: PensionnaireComponent;
  let fixture: ComponentFixture<PensionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
