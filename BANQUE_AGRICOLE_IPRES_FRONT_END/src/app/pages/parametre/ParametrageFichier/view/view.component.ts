import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FichierPaiementService } from "@services/fichierPaiement.service";
import { NotificationService } from '@services/notification.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewFichierComponent implements OnInit {
 

  constructor(private fichierService:FichierPaiementService ,private notification:NotificationService) { }

  ngOnInit(): void {

    this.GetFiles();
  }
  fileData:any;
  fileDataSource:any;
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  GetFiles(){
    this.fichierService.GetAllFile().subscribe({
      next: (value) =>{
       this.fileData = value;
      this. displayedColumns = ['nom','datePourPaiement','prenom','nomUser','num','dateAjout','action'];
       this.fileDataSource = new MatTableDataSource<any>(this.fileData);
       this.fileDataSource.paginator = this.paginator;
       this.fileDataSource.sort = this.sort;
       console.log("fileData " , this.fileData)
      },
      error: (err : HttpErrorResponse) =>{
         this.notification.showError(err.error ,"Error");
      },
      complete() {
        
      },
    })

  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.fileDataSource.filter = filvalue;
    
  }
  SaveMetaDataFile(data:any){
    localStorage.setItem('idFile',data);
  }

}
