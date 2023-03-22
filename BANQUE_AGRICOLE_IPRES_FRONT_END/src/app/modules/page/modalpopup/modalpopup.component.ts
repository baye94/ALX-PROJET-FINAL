import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgenceService } from '@services/agence.service';
import { IAgence } from '@/interfaces/agence';
@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss']
})
export class ModalpopupComponent implements OnInit {

  constructor(private agenceService: AgenceService, public dialogref: MatDialogRef<ModalpopupComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  desdata: any;
  respdata: any;
  editdata: any;
  dataAgence:any;
  tt: any;

  ngOnInit(): void {
    // this.loadDes();
    console.log("test")
    if(this.data.empcode!=null && this.data.empcode!=''){
this.LoadEditData(this.data.empcode);
    }
  }

  // loadDes() {
  //   this.agenceService.GetDes().subscribe(result => {
  //     this.desdata = result;
  //   });
  // }

  LoadEditData(code: any) {
    this.agenceService.GetAgencebycode(code).subscribe(item => {
      this.editdata = item;
      this.Reactiveform.setValue({id:this.editdata.id,numAgence:this.editdata.numAgence ,libelle:this.editdata.libelle,adresse:this.editdata.adresse,
        idPartenaire:this.editdata.idPartenaire})
    });
  }
  // id: new FormControl({ value: 0, disabled: true }),

  Reactiveform = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    numAgence: new FormControl(""),
    libelle: new FormControl("", Validators.required),
    adresse: new FormControl("", Validators.required),
    idPartenaire: new FormControl(""),
  });
  

 async SaveAgence() {

    console.log("test save employe" , this.Reactiveform.getRawValue())
    // this.updateTutorial();
    console.log(this.Reactiveform.value.libelle)
    this.Reactiveform.getRawValue()
    if (this.Reactiveform.valid) {
  
     this.dataAgence = {   
      Id:this.data.empcode,
      NumAgence: this.Reactiveform.value.numAgence,
      Libelle:this.Reactiveform.value.libelle ,
      Adresse: this.Reactiveform.value.adresse,
      IdPartenaire: this.Reactiveform.value.idPartenaire
  }
    
     console.log(  "fall" ,this.Reactiveform.value)
     console.log(this.data.empcode)
     console.log(this.Reactiveform.value.id);
     
    this.agenceService.Update(this.data.empcode, this.dataAgence ).subscribe(result => {
        this.respdata = result;
        console.log("test result", result);
        if (this.respdata.result == 'pass') {
          alertify.success("saved successfully.");
          this.dialogref.close();
        }
      });
      
    } else {
      alertify.error("Please Enter valid data")
      console.log("error")
    }
    console.log(  "fall sortie boucle" ,this.Reactiveform.value)
  }


}
