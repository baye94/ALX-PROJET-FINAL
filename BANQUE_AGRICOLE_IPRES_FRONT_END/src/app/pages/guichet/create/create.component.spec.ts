import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuichetComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateGuichetComponent;
  let fixture: ComponentFixture<CreateGuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGuichetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
