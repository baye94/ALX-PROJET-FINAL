import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-agent',
  templateUrl: './password-agent.component.html',
  styleUrls: ['./password-agent.component.scss']
})
export class PasswordAgentComponent implements OnInit {

  secondFormGroup: FormGroup;
  post: any;
  idUser : any;

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder, private tokenService: TokenService, private notification: NotificationService, private serviceUser: UserService, private router: Router) { }
  ngOnInit(): void {
    this.CreateForm();
    this.idUser = localStorage.getItem('idUser');

  }
  CreateForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.secondFormGroup = this._formBuilder.group({
      "id": "",
      "ancienpass": [null, [Validators.required, this.checkPassword]],
      "pass":  [null, [Validators.required, this.checkPassword]]
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPasswordancienpass() {
    return this.secondFormGroup.get('ancienpass').hasError('required') ? 'Le champ est obligatoire (au moins huit caractères, une lettre majuscule , une lettre en minuscule et un chiffre.)' :
      this.secondFormGroup.get('ancienpass').hasError('requirements') ? 'Le mot de passe doit comporter au moins huit caractères, une lettre majuscule et un chiffre.' : '';
  }
  getErrorPasswordpass() {
    return this.secondFormGroup.get('pass').hasError('required') ? 'Le champ est obligatoire (au moins huit caractères, une lettre majuscule , une lettre en minuscule et un chiffre.)' :
      this.secondFormGroup.get('pass').hasError('requirements') ? 'Le mot de passe doit comporter au moins huit caractères, une lettre majuscule et un chiffre.' : '';
  }

  SaveData(post: any) {
    this.post = post;
    console.log("log de post depuis modification email", this.post);
    this.post.id = this.idUser;
    console.log("log de  user post", this.tokenService.getPayload().Id.toString());
    if (this.post != null) {
      this.serviceUser.UpdateEmailAgent(this.post).subscribe({
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
