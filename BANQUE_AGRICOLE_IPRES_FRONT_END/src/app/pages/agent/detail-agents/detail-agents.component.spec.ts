import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAgentsComponent } from './detail-agents.component';

describe('DetailAgentsComponent', () => {
  let component: DetailAgentsComponent;
  let fixture: ComponentFixture<DetailAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
