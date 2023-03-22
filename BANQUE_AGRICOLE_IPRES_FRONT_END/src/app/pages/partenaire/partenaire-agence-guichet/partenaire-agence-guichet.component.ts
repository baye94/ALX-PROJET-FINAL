import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GuichetService } from '@services/guichet.service';
import { NotificationService } from '@services/notification.service';
import { PartenaireService } from '@services/partenaire.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-partenaire-agence-guichet',
  templateUrl: './partenaire-agence-guichet.component.html',
  styleUrls: ['./partenaire-agence-guichet.component.scss']
})
export class PartenaireAgenceGuichetComponent implements OnInit {

  constructor(private token:TokenService, private dialog: MatDialog, private formBuilder: FormBuilder, private notification: NotificationService, private service: PartenaireService, private guichetService: GuichetService) { }
  agencedata: any
  formGroup: FormGroup;
  titleAlert: string = 'Champs obligatoire';
  post: any = '';
  guichetData: any;

  ngOnInit() {
    this.token.clearTokenExpired();
    this.loadAgence()
    this.createForm();
    // this.setChangeValidate()
  }

  createForm() {
    // let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    if (this.post != null) {
      this.guichetService.Save(this.post).subscribe({
        next: (result) => {
          this.notification.showSuccess("Enregistrement réuissi!!", "");
        },
        error: (err) => {
          this.notification.showError("Formulaire invalide", "");
        },
        complete: () => {
          this.dialog.closeAll();
        },
      })
    }

  }
  loadAgence() {
    this.service.GetPartenaireAgence(localStorage.getItem('idPartenaire')).subscribe({

      next: (result) => {
        this.agencedata = result;
        console.log("agence result", result)
      },
      error: (err) => {
        console.error(err);
      },
      complete() {

      },
    })
  }



}
