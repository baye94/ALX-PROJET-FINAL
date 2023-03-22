import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AgenceService } from '@services/agence.service';
import { Observable }    from 'rxjs';
import { IGuichet } from "@/interfaces/guichet";
import { GuichetService } from '@services/guichet.service';
import { NotificationService } from '@services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateGuichetComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'Champs obligatoire';
  post: any = '';
  guichetData: IGuichet;

  constructor(private token:TokenService ,private dialog: MatDialog  ,private formBuilder: FormBuilder , private agenceService: AgenceService , private guichetService: GuichetService , private notificationService : NotificationService) { }
  agencedata: any

  ngOnInit() {
    this.token.clearTokenExpired();
    this.loadAgence()
    this.createForm();
    // this.setChangeValidate()
  }

   createForm() {
    this.formGroup = this.formBuilder.group({
   
      "libelle": [null, Validators.required],
      "idAgence": [null, Validators.required],
      "DateCreate":"",
      "DateUpdate":"",
      "Status":1,
    });
  }


  get name() {
    return this.formGroup.get('libelle') as FormControl
  }


  onSubmit(post: any) {
    this.post = post;
    if(this.post != null){
      this.guichetService.Save(this.post).subscribe({
        next: (result) =>{
          this.notificationService.showSuccess("Enregistrement reuissi", '')
        },
        error: (err) => {
          this.notificationService.showError("Formulaire invalide", "")
        },
        complete: () => {
          this.dialog.closeAll();    
         },
      })
    }

  }
  loadAgence() {
    this.agenceService.GetAgence().subscribe(result => {
      this.agencedata = result;
      console.log("agence load", result)
    });
  }

}
