import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuichetAgentComponent } from './guichet-agent.component';

describe('GuichetAgentComponent', () => {
  let component: GuichetAgentComponent;
  let fixture: ComponentFixture<GuichetAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuichetAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuichetAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
