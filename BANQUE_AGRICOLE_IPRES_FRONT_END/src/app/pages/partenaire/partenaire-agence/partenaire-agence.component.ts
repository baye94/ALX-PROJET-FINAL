import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AgenceService } from '@services/agence.service';
import { Observable } from 'rxjs';
import { PartenaireService } from "@services/partenaire.service";
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-partenaire-agence',
  templateUrl: './partenaire-agence.component.html',
  styleUrls: ['./partenaire-agence.component.scss']
})
export class PartenaireAgenceComponent implements OnInit {
  formGroup: any;
  post: any;
  titleAlert: any;
  idPartenaire: any;

  constructor( private token:TokenService,private dialog: MatDialog ,private formBuilder: FormBuilder, private partenaireService: PartenaireService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.token.clearTokenExpired();
    this.idPartenaire = localStorage.getItem('idPartenaire')
    this.createForm();
  }

  createForm() {
    // let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      "libelle": [null, Validators.required],
      "adresse": [null, Validators.required],
      "idPartnaire": "",
      "DateCreate":"",
      "DateUpdate":"",
      "Status":1,
    });
  }

  get name() {
    return this.formGroup.get('libelle') as FormControl
  }
  get adresse() {
    return this.formGroup.get('adresse') as FormControl
  }

  onSubmit(post: any) {
    this.post = post;
    this.post.idPartenaire = this.idPartenaire;
    if (this.post != null) {
      this.partenaireService.AddPartenaireAgence(this.post).subscribe({
        next: (result) => {
          console.log("resultat", result)
          if (result != null) {
            this.notificationService.showSuccess("Enregistrement reuissi", '')
          }
          console.log("result est null", this.post)
        },
        error: (err: HttpErrorResponse) => {
          this.notificationService.showError("Formulaire invalide", "")
         console.error(err)
        },
        complete: () => {
          this.dialog.closeAll()
          
        }
      })
     
    }

  }

}
