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
  selector: 'app-login-agent',
  templateUrl: './login-agent.component.html',
  styleUrls: ['./login-agent.component.scss']
})
export class LoginAgentComponent implements OnInit {
  secondFormGroup: FormGroup;
  isLinear = false;
  post: any;
  idUser : any;
  editdata:any
  login:any;
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
    this.secondFormGroup = this._formBuilder.group({
      "id": "",
      "username": ["", [Validators.required , Validators.minLength(5)]]
    });
  }
  LoadEditData(code: any) {
    this.serviceUser.GetUserAspnetById(code).subscribe(item => {
     this.login = item.userName;
    
    });
  }
  

  SaveData(post: any) {
    this.post = post;
    this.post.id = localStorage.getItem('idUser')
    this.post.username = this.login

    console.log("log de post depuis modification email", this.post);
    console.log("log de post depuis modification", this.post.id);
    this.post.id = this.idUser;
    console.log("log de  user post", this.tokenService.getPayload().Id.toString());
    if (this.post != null) {
      this.serviceUser.ChangementAgentUserName(this.post).subscribe({
        next: (result) => {

          this.notification.showSuccess("changement login reuissi", 'Email')
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
