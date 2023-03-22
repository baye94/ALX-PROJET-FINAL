import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgenceService } from '@services/agence.service';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-agent',
  templateUrl: './email-agent.component.html',
  styleUrls: ['./email-agent.component.scss']
})
export class EmailAgentComponent implements OnInit {
  secondFormGroup: FormGroup;
  isLinear = false;
  post: any;
  idUser : any;
  editdata:any
  email:any;

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder, private tokenService: TokenService, private notification: NotificationService, private serviceUser: UserService, private router: Router) { }
  ngOnInit(): void {
    // this.secondFormGroup.setValue({
    //   ancienEmail: "email",
    // })
    this.LoadEditData(localStorage.getItem('idUser'))
    console.log("hhhhh" , this.LoadEditData)
    this.CreateForm();
    console.log("fallgggg" ,  this.tokenService.getPayload().Id.toString())
    this.idUser =localStorage.getItem('idUser');

  }
  CreateForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.secondFormGroup = this._formBuilder.group({
      "id": "",
      "ancienEmail":"",
      "email": ["", [Validators.required, Validators.pattern(emailregex)]]
    });
  }
  LoadEditData(code: any) {
    this.serviceUser.GetUserAspnetById(code).subscribe(item => {
     this.email = item.email;
    
    });
  }
  
  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }
  getErrorEmailNouveau() {
    return this.secondFormGroup.get('email').hasError('required') ? 'Le champ est obligatoire' :
      this.secondFormGroup.get('email').hasError('pattern') ? "L'adresse électronique n'est pas valide" :
        this.secondFormGroup.get('email').hasError('alreadyInUse') ? 'Cette adresse e-mail est déjà utilisée' : '';
  }
  getErrorEmailAncien() {
    return this.secondFormGroup.get('ancienEmail').hasError('required') ? 'Le champ est obligatoire' :
      this.secondFormGroup.get('ancienEmail').hasError('pattern') ? "L'adresse électronique n'est pas valide" :
        this.secondFormGroup.get('ancienEmail').hasError('alreadyInUse') ? 'Cette adresse e-mail est déjà utilisée' : '';
  }

  SaveData(post: any) {
    this.post = post;
    this.post.id = localStorage.getItem('idUser')
    this.post.ancienEmail = this.email

    console.log("log de post depuis modification email", this.post);
    console.log("log de post depuis modification", this.post.id);
    this.post.id = this.idUser;
    console.log("log de  user post", this.tokenService.getPayload().Id.toString());
    if (this.post != null) {
      this.serviceUser.UpdateEmailParAdmin(this.post).subscribe({
        next: (result) => {

          this.notification.showSuccess("changement email reuissi", 'Email')
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
