import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanAgenceComponent } from './bilan-agence.component';

describe('BilanAgenceComponent', () => {
  let component: BilanAgenceComponent;
  let fixture: ComponentFixture<BilanAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
