import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanAgentComponent } from './bilan-agent.component';

describe('BilanAgentComponent', () => {
  let component: BilanAgentComponent;
  let fixture: ComponentFixture<BilanAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
