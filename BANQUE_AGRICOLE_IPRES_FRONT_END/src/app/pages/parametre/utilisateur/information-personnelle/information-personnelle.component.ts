import { IInfoAgent } from '@/interfaces/infoAgent';
import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgenceService } from '@services/agence.service';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information-personnelle',
  templateUrl: './information-personnelle.component.html',
  styleUrls: ['./information-personnelle.component.scss']
})
export class InformationPersonnelleComponent implements OnInit {

  infoPerso: FormGroup;
  pass :any;
  email:any;
  prenom:any;
  nom:any;
  username:any;
  telephone:any;
  num:any;
  post:any;
  InfoAgent: IInfoAgent;
  dataAgent:IInfoAgent
  id:any;
  constructor(private _formBuilder: FormBuilder  ,private notification:NotificationService , private serviceUser: UserService ,private dialog:MatDialog) { }

 
   ngOnInit(): void {
     this.LoadEditData(localStorage.getItem('idUser'));
     this.LoadEditDatadd(localStorage.getItem('idUser'))
     this.id = localStorage.getItem('idUser');
     this.CreateForm();
     
   }
 
 
 
   CreateForm(){
     this.infoPerso = this._formBuilder.group({
      "id": "824853",
       "prenom": [this.prenom],
       "num":"",
       "nom": [this.nom],
       "telephone": [this.telephone],
      

   
     });
   }
   LoadEditData(code: any) {
    this.serviceUser.GetAgentInfoPersoById(code).subscribe(item => {
      console.log("item " , item[0]?.id);
      this.InfoAgent = item,
      
      console.log("infoagent", this.InfoAgent?.nom);
      this.prenom = item.prenom;
      this.nom = item.nom;
      this.num = item.num;
     this.telephone = item.telephone;
    
    });
  }
   
  
   SaveData(){
     if (this.Reactiveform.valid) {
      //  this.dataAgent.id = this.InfoAgent?.id;
      this.dataAgent = this.Reactiveform.value;
      // this.dataAgent.nom = this.Reactiveform.value.nom;
      // this.dataAgent.prenom = this.Reactiveform.value.prenom;
      // this.dataAgent.num = this.InfoAgent.num;
      console.log("kdnkfkfkdkd" , this.dataAgent);
       this.serviceUser.Update( this.dataAgent.id,this.dataAgent).subscribe({
         next: (result) => {
           if (result != null) {
             this.notification.showSuccess("Mise á jours reuissi", '')
           }
         },
         error: (err: HttpErrorResponse) => {
            this.notification.showError(err.error.errors, "Formulaire invalide");
            console.log("connexion errrp" , err)
         },
         complete: () => {
           this.dialog.closeAll()
         }
       })
       
 
     }
 
   }



   LoadEditDatadd(code: any) {
    this.serviceUser.GetAgentInfoPersoById(code).subscribe(item => {
      this.InfoAgent = item;
      this.Reactiveform.setValue({
        id: this.InfoAgent.id, prenom: this.InfoAgent.prenom, nom: this.InfoAgent.nom, num: this.InfoAgent.num ,telephone:this.InfoAgent.telephone
      })
    });
  }

  Reactiveform = new FormGroup({
    id: new FormControl( "", Validators.required ),
    prenom: new FormControl("", Validators.required),
    nom: new FormControl("", Validators.required),
    telephone: new FormControl("", Validators.required),
    num:new FormControl("", Validators.required),

  });

}
