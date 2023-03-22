import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgenceService } from '@services/agence.service';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-guichet-agent',
  templateUrl: './guichet-agent.component.html',
  styleUrls: ['./guichet-agent.component.scss']
})
export class GuichetAgentComponent implements OnInit {
  secondFormGroup: FormGroup;
  isLinear = false;
  agencedata: any;
  agenceId: any;
  guichetData: any;
  post: any;

  constructor(private dialog: MatDialog ,private _formBuilder: FormBuilder, private agenceService: AgenceService, private notification: NotificationService, private serviceUser: UserService, private router: Router) { }
  ngOnInit(): void {
    this.loadAgence();
    this.CreateForm();

  }
  CreateForm() {
    this.secondFormGroup = this._formBuilder.group({
      "id": [''],
      "idUser": ['', Validators.required],
      "idGuichet": ['', Validators.required]
    });
  }

  loadAgence() {
    this.agenceService.GetAgence().subscribe({

      next: (result) => {
        this.agencedata = result;
        console.log("agence result", result)
        console.log("id agence selectionnee ,", this.agencedata.id);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      },
    })
  }
  GetAgenceGuichet(id: any) {

    if (id != "") {
      this.agenceService.GetAgenceGuichet(id).subscribe({
        next: (value) => {

          this.guichetData = value;
          if (this.guichetData.length == 0) {
            this.notification.showWarning("L'agence n'a pas encore de guichet ou ses guichets sont desactivés", 'Agence')
          }
          console.log("ses guichet sont  taille:", this.guichetData.length);
        }
      })
    } else {
      this.notification.showError("Veuillez choisir une agence svp.", 'Agence')
      console.log("test continu")

    }
  }

  public onChange(event): void {
    const id = event.target.value;
    if (id != "") {
      console.log(" baye cheikh fall", id);
      this.GetAgenceGuichet(id)
    } else {
      this.notification.showError("Veuillez choisir une agence svp.", 'Agence');
    }

  }

  SaveData(post: any) {
    this.post = post;
    console.log(this.post);
    console.log("log de post", this.post.idGuichet);
    this.post.idUser = localStorage.getItem('idUser');
    console.log("log de  user post",  this.post.idUser);
    if (this.post != null) {
      this.serviceUser.SaveGuichetAgent(this.post).subscribe({
        next: (result) => {
          
            this.notification.showSuccess("Affectation guichet reuissi", 'Guichet')
          
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
