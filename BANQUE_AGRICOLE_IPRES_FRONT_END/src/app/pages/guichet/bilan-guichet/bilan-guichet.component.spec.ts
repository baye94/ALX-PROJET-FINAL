import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanGuichetComponent } from './bilan-guichet.component';

describe('BilanGuichetComponent', () => {
  let component: BilanGuichetComponent;
  let fixture: ComponentFixture<BilanGuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanGuichetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
