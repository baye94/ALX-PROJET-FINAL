import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalpopupComponent } from '@modules/page/modalpopup/modalpopup.component';
import { AgenceService } from '@services/agence.service';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';
import * as alertify from 'alertifyjs'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateAgenceComponent implements OnInit {

  
  secondFormGroup: FormGroup;
  isLinear = false;
  agencedata: any;
  agenceId: any;
  guichetData: any;
  post: any;
  idUser : any;
  titleAlert: string = 'Champs obligatoire , 5 caractères au minimunm';

  constructor( private dialog:MatDialog ,private agenceService:AgenceService  , private _formBuilder: FormBuilder, private tokenService: TokenService, private notification: NotificationService, private serviceUser: UserService, private router: Router) { }
  ngOnInit(): void {
    this.tokenService.clearTokenExpired();
    this.CreateForm();
    console.log("fallgggg" ,  this.tokenService.getPayload().Id.toString())
    this.idUser =localStorage.getItem('idUser');

  }
  CreateForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.secondFormGroup = this._formBuilder.group({
      
      "libelle": ["", [Validators.required, Validators.minLength(5)]],
      "adresse": ["", [Validators.required, Validators.minLength(5)]]
    });
  }

 
  getErrorEmailNouveau() {
    return this.secondFormGroup.get('libelle').hasError('required') ? 'Le champ est obligatoire' :
      this.secondFormGroup.get('libelle').hasError('pattern') ? "L'adresse électronique n'est pas valide" :
        this.secondFormGroup.get('libelle').hasError('alreadyInUse') ? 'Cette adresse e-mail est déjà utilisée' : '';
  }
  getErrorEmailAncien() {
    return this.secondFormGroup.get('adresse').hasError('required') ? 'Le champ est obligatoire' :
      this.secondFormGroup.get('adresse').hasError('pattern') ? "L'adresse électronique n'est pas valide" :
        this.secondFormGroup.get('adresse').hasError('alreadyInUse') ? 'Cette adresse e-mail est déjà utilisée' : '';
  }

  SaveData(post: any) {
    this.post = post;
    console.log("log de post depuis modification email", this.post);
    this.post.id = this.idUser;
    console.log("log de  user post", this.tokenService.getPayload().Id.toString());
    if (this.post != null) {
      this.agenceService.Save(this.post).subscribe({
        next: (result) => {

          this.notification.showSuccess("Création d'agence reuissi", 'Agence')
          console.log("le resultat est " , result)

        },
        error: (err: HttpErrorResponse) => {
          if (err)
            this.notification.showError(err.error, "Formulaire invalide")
        },
        complete: () => {
          this.dialog.closeAll();
          
        }
      })
    }
  }

}
