import { IGuichet } from '@/interfaces/guichet';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PensionnaireService } from "@services/pensionnaire.service";
import { ApiService } from "@services/api.service";
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { TokenService } from '@services/token.service';
/**
 * @title Table with pagination
 */

@Component({
  selector: 'app-pensionnaire',
  templateUrl: './pensionnaire.component.html',
  styleUrls: ['./pensionnaire.component.scss']
})
export class PensionnaireComponent implements OnInit {
  constructor(private token:TokenService ,private ngxLoader: NgxUiLoaderService ,private pensionnaireService: PensionnaireService, private apiService: ApiService) { }
  pensionnnaireDate: any;
  dataSourceGuichetpensionnaire: any;
  spinnerType = SPINNER.circle;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.ngxLoader.start();
        console.log("pensionnnaire id ", localStorage.getItem('matriculePansionnaire'))
    this.GetAllPensionnaire();
  }
  displayedColumns: string[] = ['nom', 'prenom', 'matricule', 'action'];
  
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSourceGuichetpensionnaire.filter = filvalue;

  }

  async GetAllPensionnaire(): Promise<any> {
    this.ngxLoader.start();

    try {
      this.pensionnaireService.GetAllPensionnaire().subscribe({ next: (result) => {
        this.ngxLoader.stop();
        // this.ngxLoader.startBackground();   
        this.pensionnnaireDate = result;
        this.dataSourceGuichetpensionnaire = new MatTableDataSource<IGuichet>(this.pensionnnaireDate)
        this.dataSourceGuichetpensionnaire.paginator = this.paginator;
        this.dataSourceGuichetpensionnaire.sort = this.sort;
      },
      error: (err) => {
        console.log(err)
      },
      complete:() => {
             
      }
    });
    } catch (error) {
      console.error(error)
    }
  }

  GetPensionnaireByMatricule(matricule:any){

  }

  SaveMetaDataPensionnaire(matricule: any) {
    try {
      this.apiService.SaveMetaDataPensionnaire(matricule);

    } catch (error) {

    }

  }
}

