import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAgentComponent } from './email-agent.component';

describe('EmailAgentComponent', () => {
  let component: EmailAgentComponent;
  let fixture: ComponentFixture<EmailAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
