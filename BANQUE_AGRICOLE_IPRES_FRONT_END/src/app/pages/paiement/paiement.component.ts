import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PaiementService } from '@services/paiement.service';
import { Observable } from 'rxjs';
import { IGuichet } from "@/interfaces/guichet";
import { GuichetService } from '@services/guichet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { NotificationService } from "@services/notification.service";
import { MatDialog } from '@angular/material/dialog';
import { CreateGuichetComponent } from '@pages/guichet/create/create.component';
import { EditGuichetComponent } from '@pages/guichet/edit/edit.component';
import { ApiService } from '@services/api.service';
import * as alertify from 'alertifyjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DemandeAnnulationPaiementComponent } from './demande-annulation-paiement/demande-annulation-paiement.component';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  constructor(private token:TokenService ,private notification : NotificationService  ,private dialog: MatDialog , private service:PaiementService , private apiService:ApiService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
     this.GetAllPaiement();
     this.service.RequiredRefresh.subscribe(r => {
      this.GetAllPaiement();
     })
  }

  displayedColumns: string[] = ['evenement', 'montant','matriculePensionnaire','idUser','guichet', 'dateCreation','datePaiement','action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;
  paiementdata: any;
  demamdes:any;
  commentFC = new FormControl('', [
    Validators.required, 
    Validators.maxLength(30)
  ]);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

 

  GetAllPaiement() {
    this.service.GetAllPaiement().subscribe({ next: (result) => {
      this.paiementdata = result;
      this.dataSource = new MatTableDataSource<IGuichet>(this.paiementdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    },
    error: (err:HttpErrorResponse) => {
      this.notification.showWarning(err.error , "Permissions")
    }
  
  });
  }

  
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
    
  }

  FunctionEdit(code: any) {
    this.OpenDialogEdit('1000ms','600ms',code)
  }
  FunctionCreate(code: any) {
    this.OpenDialogCreate('1000ms','600ms')
  }
  SaveMetaData(data:any){
    this.apiService.SaveMetaDataPaiement(data)
    // var  idPaiement =  this.apiService.SaveMetaDataPaiement(data);
    console.log("id Paiement " , data)
    if (data != null) {
      this.OpenDialogDemandeAnnulation("100ms","500ms", data);
    }
  }

  OpenDialogCreate(enteranimation: any, exitanimation: any) {
    this.dialog.open(CreateGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  OpenDialogEdit(enteranimation: any, exitanimation: any,code:any) {

    this.dialog.open(EditGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        empcode:code
      }
    })

   
  }
  OpenDialogDemandeAnnulation(enteranimation: any, exitanimation: any,code:any) {

    this.dialog.open(DemandeAnnulationPaiementComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        idPaiement:code
      }
    })
  }


}

