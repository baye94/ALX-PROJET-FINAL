import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateGuichetComponent } from "./create/create.component";
import { GuichetService } from '@services/guichet.service';
import { MatSort } from '@angular/material/sort';
import { IGuichet } from '@/interfaces/guichet';
import { TokenService } from '@services/token.service';
import * as alertify from 'alertifyjs';
import { EditGuichetComponent } from './edit/edit.component';
import { ApiService } from "@services/api.service";
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@services/notification.service';
import { DesactiveGuichetComponent } from './desactive-guichet/desactive-guichet.component';
@Component({
  selector: 'app-guichet',
  templateUrl: './guichet.component.html',
  styleUrls: ['./guichet.component.scss']
})
export class GuichetComponent implements OnInit {

  constructor(private token:TokenService , private notification :NotificationService  , private dialog: MatDialog , private service:GuichetService , private apiService:ApiService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
   this.service.RequiredRefresh.subscribe(r => {
this.GetAllGuichetAgence();
  });
    this.GetAllGuichetAgence();
  }

  displayedColumns: string[] = ['numGuichet','libelle',  'agenceNum','date','statut','action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;
  empdata: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



  GetAllGuichet() {
    this.service.GetAllGuichet().subscribe({ 
      next:(result) => { 
      this.empdata = result;
      this.dataSource = new MatTableDataSource<IGuichet>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },
    error: (err:HttpErrorResponse) => {
      

    }
  });
  }
  GetAllGuichetAgence() {
    this.service.GetAllGuichetAgence().subscribe(result => {
      this.empdata = result;
      console.log("guichet" , this.empdata)
      this.dataSource = new MatTableDataSource<IGuichet>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  GetAgenceGuichet(id:any){
    this.service.GetGuichetAgence(id).subscribe((result: any) => {
      
      if(result == null){
        console.log("le resultat est null");
      }
      console.log("get agence guichet" , result);

    })
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
  FunctionDelete(code: any) {
    alertify.confirm("Supprimer le guichet","Confirmez la suppression?",()=>{
      this.service.Remove(code).subscribe(result => {
        this.GetAllGuichet();
        alertify.success("Removed successfully.")
      });

    },function(){

    })
    
  }
  SaveMetaData(data:any){
    this.apiService.saveData(data);
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

  OpenDialogDeactiverGuichet(enteranimation: any, exitanimation: any,code:any ,status:any) {

    this.dialog.open(DesactiveGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "20%",
      data:{
        idGuichet: code,
        statut: status,
      }
    })
  }
  


}

