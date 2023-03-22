import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AgenceService } from '@services/agence.service';
import { Observable } from 'rxjs';
import { PartenaireService } from "@services/partenaire.service";
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePartenaireComponent implements OnInit {
  formGroup: any;
  post: any;
  titleAlert: any;


  constructor( private token:TokenService, private formBuilder: FormBuilder, private partenaireService: PartenaireService, private notificationService: NotificationService, private router: Router) { }
  ngOnInit() {
    this.token.clearTokenExpired();
    this.createForm()
  }
  
  createForm() {
    this.formGroup = this.formBuilder.group({
      "libelle": [null, Validators.required],
      "adresse": [null, Validators.required],
      "taux": [null, Validators.required],
      
    });
  }

  get name() {
    return this.formGroup.get('libelle') as FormControl
  }
  get taux() {
    return this.formGroup.get('taux') as FormControl
  }
  get adresse() {
    return this.formGroup.get('taux') as FormControl
  }

  onSubmit(post: any) {
    this.post = post;
    console.log(this.post);
    console.log("log de post", this.post.libelle);
    if (this.post != null) {
      this.partenaireService.Save(this.post).subscribe({
        next: (result) => {
          if (result != null) {
            this.notificationService.showSuccess("Enregistrement reuissi", '')
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err)
           this.notificationService.showError("Formulaire invalide", "")
        },
        complete: () => {
          this.router.navigate(['/partenaire'])
        }
      })
      

    }

  }

}
