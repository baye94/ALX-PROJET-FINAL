import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FichierPaiementService } from '@services/fichierPaiement.service';
import { NotificationService } from '@services/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detail-upload-fichier',
  templateUrl: './detail-upload-fichier.component.html',
  styleUrls: ['./detail-upload-fichier.component.scss']
})
export class DetailUploadFichierComponent implements OnInit {

taille: any;
displayedColumnsPaiementList: string[] = ['evenement', 'agent', 'montant', 'matricule', 'guichet', 'agence', 'dateCreation', 'fichier'];
dataSource:any;
paiementData: any;
fileName: any = "Bilan-fichier.xlsx";

 constructor(private notification:NotificationService , private service:FichierPaiementService) { }

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort !: MatSort;
 
  ngOnInit(): void {
    this.GetAllPaiementByFile();
    console.log("jfjhfjdsf", localStorage.getItem('idFile'));
  }
  GetAllPaiementByFile(){
    var id = localStorage.getItem('idFile');
	 this.service.GetAllPaiementFile(id).subscribe({
    next: (value) => {

   this.taille = value;
    this.paiementData = value;
    this.dataSource = new MatTableDataSource<any>(this.paiementData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  
    }
   })

  }
  remove(){
    localStorage.removeItem('idFile');
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
    
  }

}
