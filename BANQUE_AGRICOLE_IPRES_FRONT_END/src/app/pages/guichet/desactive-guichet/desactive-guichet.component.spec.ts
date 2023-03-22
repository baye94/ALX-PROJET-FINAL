import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactiveGuichetComponent } from './desactive-guichet.component';

describe('DesactiveGuichetComponent', () => {
  let component: DesactiveGuichetComponent;
  let fixture: ComponentFixture<DesactiveGuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesactiveGuichetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesactiveGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
