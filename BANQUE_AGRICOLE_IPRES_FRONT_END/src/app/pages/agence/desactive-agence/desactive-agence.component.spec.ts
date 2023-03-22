import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactiveAgenceComponent } from './desactive-agence.component';

describe('DesactiveAgenceComponent', () => {
  let component: DesactiveAgenceComponent;
  let fixture: ComponentFixture<DesactiveAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesactiveAgenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesactiveAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
