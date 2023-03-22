import { IAgence } from '@/interfaces/agence';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as alertify from 'alertifyjs';

import { AgenceService } from '@services/agence.service';
import { ModalpopupComponent } from '@modules/page/modalpopup/modalpopup.component';
import { CreateGuichetComponent } from '@pages/guichet/create/create.component';
import { EditGuichetComponent } from '@pages/guichet/edit/edit.component';
import { CreateAgenceComponent } from './create/create.component';
import { DesactiveAgenceComponent } from './desactive-agence/desactive-agence.component';
import { SharedService } from '@services/shared.service';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {

  title = 'app1';
  displayedColumns: string[] = ['numAgence', 'libelle', 'adresse', 'date', 'statut', 'action'];
  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: AgenceService, private dialog: MatDialog,
    private agenceService: AgenceService, private shared: SharedService , private token:TokenService) { }
  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.GetAll();
    this.service.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }
  GetAll2() {
    this.service.GetAgence().subscribe(result => {
      this.empdata = result;
      console.log("empdata", this.empdata)
      this.dataSource = new MatTableDataSource<IAgence>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

  GetAll() {
    this.service.GetAgenceByprofile().subscribe(result => {
      this.empdata = result;
      //  console.log("agence ddd" , this.empdata || null)
      this.dataSource = new MatTableDataSource<any>(this.empdata)
      // this.dataSource = [(this.empdata as any[])]
      if (this.empdata?.length > 5) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      console.log("empdata", this.empdata);
    });
  }


  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {
    //console.log(row);
  }
  FunctionEdit(code: any) {
    this.OpenDialog('1000ms', '600ms', code)
  }
  FunctionDelete(code: any) {
    alertify.confirm("Remove Employee", "Do you want to remove?", () => {
      this.service.Remove(code).subscribe(result => {
        this.GetAll();
        alertify.success("Removed successfully.")
      });

    }, function () {

    })

  }

  OpenDialog(enteranimation: any, exitanimation: any, code: any) {

    this.dialog.open(ModalpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        empcode: code
      }
    })
  }


  OpenDialogCreate(enteranimation: any, exitanimation: any) {

    this.dialog.open(CreateAgenceComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",

    })
  }
  OpenDialogEdit(enteranimation: any, exitanimation: any, code: any) {

    this.dialog.open(EditGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        empcode: code
      }
    })
  }

  OpenDialogDeactiverGuichet(enteranimation: any, exitanimation: any, code: any, status: any) {

    this.dialog.open(DesactiveAgenceComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "20%",
      data: {
        idAgence: code,
        statut: status,
      }
    })
  }
 SaveIdAgence(id){
  this.shared.SetIdAgence(id);
 }

}
