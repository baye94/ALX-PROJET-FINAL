import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PartenaireService } from "@services/partenaire.service";
import { ApiService } from "@services/api.service";
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.scss']
})
export class PartenaireComponent implements OnInit {


  displayedColumnsPartenaireList: string[] = ['num','libelle', 'taux','status','action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSourcePartenaireList: any;
  partenaireListdata: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



  constructor(private token:TokenService ,private apiService:ApiService , private partenaireService : PartenaireService ) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.GetAllPartenaire();
    this.partenaireService.RequiredRefresh.subscribe(r => {
      this.GetAllPartenaire();
        });
    
  }


 async GetAllPartenaire(): Promise<void>{
  this.partenaireService.GetAllPartenaire().subscribe(result =>{
   if (result) {
    console.log(result);
    this.partenaireListdata = result;
    this.dataSourcePartenaireList = new MatTableDataSource<any>(this.partenaireListdata);
    this.dataSourcePartenaireList.sort = this.sort;
    this.dataSourcePartenaireList.paginator = this.paginator;
   }
  });


  }

  Filterchange($event: any) {
    throw new Error('Method not implemented.');
    }

    SaveMetaDataPartenaire( idPartenaire: any) {
     this.apiService.SaveMetaDataPartenaire(idPartenaire);
    }
    

    FunctionEdit(tes: any){

    }

}
