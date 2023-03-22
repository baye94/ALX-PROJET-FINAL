import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@services/notification.service';
import { PaiementService } from '@services/paiement.service';
import { PartenaireService } from '@services/partenaire.service';
import { TokenService } from '@services/token.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bilan-agent',
  templateUrl: './bilan-agent.component.html',
  styleUrls: ['./bilan-agent.component.scss']
})
export class BilanAgentComponent implements OnInit {

  form: any;
  dataSource: any;
  displayedColumnsPaiementList: string[] = ['evenement','montant', 'matricule', 'guichet', 'agence', 'dateCreation', 'fichier'];

  constructor(private paiementService: PaiementService ,private formBuilder: FormBuilder, private datepipe: DatePipe, private tokenService:TokenService,
    private notificationService: NotificationService) { }

  startDate: any
  endDate: any
  formGroup: FormGroup
  bilan: any;
  fileName: any = "ExcelSheet.xlsx";
  taille: 0;
  nombreTransaction: any;
  commission: any;
  montant: any;
  totalcommission: any;
  nombre: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  ngOnInit(): void {
    this.taille = 0;

    this.createForm();
    this.formGroup.get('date2').valueChanges
      .subscribe(res => console.log("rest", res.begin));
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

  GetCommission(id: any, dateRangeStart: any, dateRangeEnd: any) {
    this.paiementService.AgentBilanPaiementEntreDeuxDate(id, dateRangeStart, dateRangeEnd).subscribe({
      next: (value) => {
      
          this.totalcommission = value;
          this.montant = this.totalcommission.montantTotal;
          
          console.log( value);
          console.log("djldsdllsldslds" , this.totalcommission.commission);
          this.totalcommission.forEach(element => {
          console.log("dernier solution ", element.commission)
          this.montant = element.montantTotal;
          this.commission = element.commission;
          this.nombre = element.nombreTotalTransaction;
          console.log(this.nombre);
            
          });

        
      },

    });

  }

  OnSubmit(dateRangeStart: any, dateRangeEnd: any) {
    if (dateRangeEnd.value.length <= 0) {
      dateRangeEnd = dateRangeStart
    }
    var id = localStorage.getItem('idUser')
    var datD = this.datepipe.transform(dateRangeStart.value, 'yyyyMMdd') || ""
    var datF = this.datepipe.transform(dateRangeEnd.value, 'yyyyMMdd') || ""
    console.log(datD);
    if (dateRangeStart.value.length > 0 && dateRangeEnd.value.length > 0) {
      this.GetCommission(id, datD, datF);
       this.paiementService.ListePaiementAgentEntreDeuxDate(id, datD, datF).subscribe({
        next: (item) => {
          this.fileName = "Bilan-Agent-" + dateRangeStart.value + "-" + dateRangeEnd.value + ".xlsx";
          this.bilan = item;
          console.log("bilan agent", this.bilan)
          this.taille = item.length;
          if (this.taille <= 0) {
            this.notificationService.showInfo(`Il y'a pas de transaction du  ${dateRangeStart.value} au ${dateRangeEnd.value}`, "Info")

          } else {
            console.log("console log bilan", this.taille);
            this.dataSource = new MatTableDataSource<any>(this.bilan);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log("sortie fonction get paiement by date", item)

          }

        },
        error: (err) => {
          console.log("erroe fonction ", err);
        },
        complete() {
          console.log(Date.now())
        },
      });
    } else {
      this.notificationService.showError(" Les dates ne sont pas correctes ", "")
    }
    console.log(" console log list ", this.datepipe.transform(dateRangeEnd.value, 'yyyyMMdd') || 0);
    console.log(" console test log", this.datepipe.transform(dateRangeStart.value, 'yyyyMMdd') || 0);

  }


  createForm() {

    this.formGroup = this.formBuilder.group({
      'date2': [{ begin: this.startDate, end: this.endDate }]
    });


  }
  click() {
    console.log("click")
  }

  get name() {
    return this.formGroup.get('starDate') as FormControl
  }
  get taux() {
    return this.formGroup.get('endDate') as FormControl
  }

}
