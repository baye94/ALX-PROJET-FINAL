import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgenceService } from '@services/agence.service';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUtilisateurComponent implements OnInit {
  infoPerso: FormGroup;
 pass :any;


  ngOnInit(): void {
    this.loadAgence();
    this.CreateForm();
  }



  CreateForm(){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.infoPerso = this._formBuilder.group({
      "prenom": ['', Validators.required],
      "nom": ['', Validators.required],
      "email": [null, [Validators.required, Validators.pattern(emailregex)]],
      "username": ['', Validators.required],
      "telephone": [null, Validators.required],
      "password":  [null, [Validators.required, this.checkPassword]],
      "confirm-password":  [null, [Validators.required]],

  
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

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  checkPasswordConfirm(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword ) ? { 'requirements': true } : null;
  }

  getErrorEmail() {
    return this.infoPerso.get('email').hasError('required') ? 'Le champ est obligatoire' :
      this.infoPerso.get('email').hasError('pattern') ? "L'adresse électronique n'est pas valide" :
        this.infoPerso.get('email').hasError('alreadyInUse') ? 'Cette adresse e-mail est déjà utilisée' : '';
  }

  getErrorPassword() {
    return this.infoPerso.get('password').hasError('required') ? 'Le champ est obligatoire (au moins huit caractères, une lettre majuscule , une lettre en minuscule et un chiffre.)' :
      this.infoPerso.get('password').hasError('requirements') ? 'Le mot de passe doit comporter au moins huit caractères, une lettre majuscule et un chiffre.' : '';
  }
  
 
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    "idAgence": ['',Validators.required],
    "idGuichet": ['' , Validators.required]
  });
  isLinear = false;
  agencedata: any;
  agenceId:any;
  guichetData:any;
  post:any;

  constructor(private _formBuilder: FormBuilder , private agenceService:AgenceService ,private notification:NotificationService , private serviceUser: UserService , private router: Router) { }

 
  loadAgence() {
    this.agenceService.GetAgence().subscribe({

      next: (result) => {
        this.agencedata = result;
        console.log("agence result", result)
        console.log("id agence selectionnee ," ,  this.agencedata.id);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
      },
    })
  }
  GetAgenceGuichet(id : any){
     
    if (id != "") {
	this.agenceService.GetAgenceGuichet(id).subscribe({
	      next: (value) => {
          
          this.guichetData = value;
          if (this.guichetData.length == 0) {
            this.notification.showWarning("L'agence n'a pas encore de guichet ou ses guichets sont desactivés", 'Agence')
          }
	        console.log("ses guichet sont  taille:" , this.guichetData.length);
	      }
	    })
}else{
  this.notification.showError("Veuillez choisir une agence svp.", 'Agence')
  console.log("test continu")

}
  }

  public onChange(event): void {  
    const id = event.target.value;
    if (id != "") {
    console.log( " baye cheikh fall", id);
    this.GetAgenceGuichet(id)
    }else{
      this.notification.showError("Veuillez choisir une agence svp.", 'Agence');
    }
    
  }
  hide:any = true;
 passwordInput() { return this.infoPerso.get('password'); } 
 inscription(){
  console.log("enregistrement de nouveau utilisateur" , this.infoPerso.value);
 }
  SaveData(post: any){
    this.post = post;
    console.log(this.post);
    console.log("log de post", this.post.nom);
    if (this.post != null) {
      this.serviceUser.Save(this.post).subscribe({
        next: (result) => {
          if (result != null) {
            this.notification.showSuccess("Enregistrement reuissi", '')
          }
        },
        error: (err: HttpErrorResponse) => {
           this.notification.showError(err.error.errors, "Formulaire invalide");
           console.log("connexion errrp" , err)
        },
        complete: () => {
          this.router.navigate(['/ViewUtilisateur'])
        }
      })
      

    }

  }

}
