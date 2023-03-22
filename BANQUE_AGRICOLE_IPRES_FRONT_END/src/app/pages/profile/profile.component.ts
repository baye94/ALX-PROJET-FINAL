import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JournalisationService } from '@services/journalisation.service';
import { NotificationService } from '@services/notification.service';
import { PaiementService } from '@services/paiement.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userId: any
    userPaiementData: any;
    UserPaiementDataSource: any;
    paiementTotalData: any;
    montantTotal: any;
    nombreTotalTransaction: any;
    prenom: any;
    nom: any;
    num: any;
    ageentDetail: any;
    journalisationData: any;
    roleData: any;
    paiementAgentData: any;
    paiementAgentDataSource: any;
    displayedColumns: String[] = ['evenement', 'montant', 'matriculePensionnaire', 'dateCreation', 'status', 'datePaiement']


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

    form: any;
    dataSource: any;
    displayedColumnsPaiementList: string[] = ['evenement','montant', 'matricule', 'guichet', 'agence', 'dateCreation', 'fichier'];
  
    constructor( private formBuilder: FormBuilder,private datepipe: DatePipe,private notificationService: NotificationService ,private paiementService: PaiementService, private userService: UserService, private journalisationService: JournalisationService , private tokenService:TokenService) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    ngOnInit(): void {
        this.userId = this.tokenService.getPayload().Id;
        this.paiementService.RequiredRefresh.subscribe(a => {
          this.GetAgentPaiement();
          this.GetUserTotalPaiement();
          this.GetPaiementAgent();
        })
        this.userService.RequiredRefresh.subscribe(a => {
          this.GetAgentDetail();
          this.GetUserRole();
        });
        this.journalisationService.RequiredRefresh.subscribe(a => {
          this.GetAgentJournalisation();
        })
        this.GetAgentPaiement();
        this.GetUserTotalPaiement();
        this.GetAgentDetail();
        this.GetAgentJournalisation();
        this.GetUserRole();
        this.GetPaiementAgent();
        
    }
    GetPaiementAgent() {
        this.paiementService.GetAllPaiementAgent(this.userId).subscribe({
            next: (value) => {
                this.paiementAgentData = value;
                this.paiementAgentDataSource = new MatTableDataSource<any>(this.paiementAgentData);
                this.paiementAgentDataSource.paginator = this.paginator;
                this.paiementAgentDataSource.sort = this.sort
                console.log("paiement agents", this.paiementAgentData);
            },
            error: (error) => {

            },
            complete() {

            },
        })
    }
    GetUserRole() {
        this.userService.GetUserRole(this.userId).subscribe({
            next: (value) => {
                this.roleData = value;

            }
        })
    }
    GetAgentJournalisation() {
        this.journalisationService.JournalisationsByUserIderById(this.userId).subscribe({
            next: (value) => {
                this.journalisationData = value;
                console.log("journalisaion", this.journalisationData?.actions)
            },
            error: (error) => {

            },
            complete() {

            },
        })
    }

    GetAgentPaiement() {
        try {
            this.paiementService.GetAllPaiementAgent(this.userId).subscribe({
                next: (value) => {
                    console.log("value", value)
                    this.userPaiementData = value;
                    console.log("Les data de user", this.userPaiementData)

                },
                error: (err: HttpErrorResponse) => {
                    console.log("eroor", err.error);
                },
                complete: () => {

                }
            });
        } catch (error) {
            console.error(error)
        }
    }

    GetUserTotalPaiement() {
        try {
            this.paiementService.GetTotalPaiementAgent(this.userId).subscribe({
                next: (value) => {
                    this.paiementTotalData = value;
                    this.montantTotal = this.paiementTotalData[0].montantTotal;
                    this.nombreTotalTransaction = this.paiementTotalData[0].nombreTotalTransaction;
                },
                error: (error) => {

                },
                complete: () => {

                }
            });
        } catch (error) {
            console.error(error);

        }
    }

    GetAgentDetail() {
        this.userService.GetUserById(this.userId).subscribe({
            next: (value) => {
                this.ageentDetail = value;
                this.nom = this.ageentDetail.nom;
                this.prenom = this.ageentDetail.prenom;
                this.num = this.ageentDetail.num;

            },
            error: (error) => {

            },
            complete: () => {

            }
        })
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
                this.dataSource = new MatTableDataSource<any>(this.bilan);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
    
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
