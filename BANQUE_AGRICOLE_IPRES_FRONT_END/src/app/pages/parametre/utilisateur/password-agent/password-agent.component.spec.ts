import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAgentComponent } from './password-agent.component';

describe('PasswordAgentComponent', () => {
  let component: PasswordAgentComponent;
  let fixture: ComponentFixture<PasswordAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
