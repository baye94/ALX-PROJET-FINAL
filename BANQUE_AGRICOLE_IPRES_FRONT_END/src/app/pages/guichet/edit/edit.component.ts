import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalpopupComponent } from '@modules/page/modalpopup/modalpopup.component';
import * as alertify from 'alertifyjs'
import { GuichetService } from "@services/guichet.service";
import { AgenceService } from "@services/agence.service";
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditGuichetComponent implements OnInit {


  constructor(private token:TokenService ,private notification:NotificationService, private guichetService: GuichetService, public dialogref: MatDialogRef<ModalpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private agenceService: AgenceService) { }

  agencedata: any;
  respdata: any;
  editdata: any;
  dataGuichet: any;

  ngOnInit(): void {
    // this.loadDes();
    this.token.clearTokenExpired();
    console.log("test loqd qgence", this.loadAgence())
    if (this.data.empcode != null && this.data.empcode != '') {
      this.LoadEditData(this.data.empcode);
      
    }
  }


  // loadDes() {
  //   this.agenceService.GetDes().subscribe(result => {
  //     this.desdata = result;
  //   });
  // }

  LoadEditData(code: any) {
    this.guichetService.GetGuichetbycode(code).subscribe(item => {
      this.editdata = item;
      this.Reactiveform.setValue({
        id: this.editdata.id, numGuichet: this.editdata.numGuichet, libelle: this.editdata.libelle, agenceNum: this.editdata.idAgence,
      })
    });
  }

  Reactiveform = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    numGuichet: new FormControl({ value: "", disabled: true }),
    libelle: new FormControl("", Validators.required),
    agenceNum: new FormControl("", Validators.required),


  });

  SaveGuichet() {
    if (this.Reactiveform.valid) {
      this.dataGuichet =
      {
        id:this.data.empcode,
        numGuichet: this.Reactiveform.value.numGuichet,
        libelle: this.Reactiveform.value.libelle,
        idAgence: this.Reactiveform.value.agenceNum,
      }
      console.log(this.dataGuichet);
      this.guichetService.updateData(this.dataGuichet ,this.data.empcode).subscribe({next: (result) => {
        this.respdata = result;
      },
      error:(err:HttpErrorResponse) => {
        this.notification.showSuccess("mise á jour guichet reuissi", "Guichet")
      },
      complete: () => {
        this.dialogref.close()
      }
    });

    } else {
      alertify.error("Verifiez vos donnees")
      console.log("error")
    }
  }
  loadAgence() {
    this.agenceService.GetAgence().subscribe(result => {
      this.agencedata = result;
      console.log("agence load", result)
    });
  }

}
