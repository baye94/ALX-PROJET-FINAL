import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUploadFichierComponent } from './detail-upload-fichier.component';

describe('DetailUploadFichierComponent', () => {
  let component: DetailUploadFichierComponent;
  let fixture: ComponentFixture<DetailUploadFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUploadFichierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailUploadFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
