import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PaiementService } from '@services/paiement.service';
import { IGuichet } from "@/interfaces/guichet";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from "@services/notification.service";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { PensionnaireService } from '@services/pensionnaire.service';
import { MatListModule } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '@services/shared.service';
import { Router } from '@angular/router';
import { ValidationPaiementComponent } from '../validation-paiement/validation-paiement.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '@services/token.service';
export enum SelectType {
  single,
  multiple,
  tous
}
@Component({
  selector: 'app-liste-paiement-pensionnaire',
  templateUrl: './liste-paiement-pensionnaire.component.html',
  styleUrls: ['./liste-paiement-pensionnaire.component.scss']
})

export class ListePaiementPensionnaireComponent implements OnInit {
  selectType = [
    { text: "Single", value: SelectType.single },
    { text: "Multiple", value: SelectType.multiple },
    { text: "tous", value: SelectType.tous }
  ];
nom: any;
displayedColumns: string[] = ['select', 'salaire', 'datepaie'];
  displayedColumnsPaiement: string[] = ['evenement', 'montant', 'idUser', 'dateCreation', 'datePaiement'];
  dataSource2: any;
  idPensionnaires: string[];
  selectedOptions = [];
  selectedOption;
  selection:any = new SelectionModel<any>(true, []);
  displayType = SelectType.multiple;
  post: any;
  dataSource:any;
  cni:any;
  paiementInput: any;
  paiementData: any;
  ids: string[] = [];
  formGroupCni: FormGroup;
  titleAlert: string = 'Champs obligatoire';
  sharedData: string;
data: any;
  constructor(private token:TokenService ,private dialog:MatDialog ,private router: Router ,private formBuilder: FormBuilder,private notification:NotificationService,private sharedService:SharedService, private paiementService : PaiementService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

ss: any;
  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.sharedService.sharedData$
      .subscribe(sharedData => this.sharedData = sharedData);
      this.paiementService.RequiredRefresh.subscribe(r => {
        this.GetPaiementData();
        this.GetPAiementByMatricule(localStorage.getItem('fall'));
      })
      console.log("localStorage.setItem", localStorage.getItem('fall') )
     this.GetPaiementData();
     this.createFormCni();
     this.GetPAiementByMatricule(localStorage.getItem('fall'))
    
     
    
  }
  createFormCni() {
    this.formGroupCni = this.formBuilder.group({
      'cni': [null, Validators.required],
    });
  }

  get name2() {
    return this.formGroupCni.get('cni') as FormControl
  }
  GetPaiementData(){
    this.post = this.sharedService.getdat();
    this.dataSource = new MatTableDataSource<any>(this.post)
    if (this.post != null) {
      this.nom = this.post[0]?.prenom + "  " + this.post[0]?.nom;
    }
    else {
      this.nom = "";
    }
  }

  GetPAiementByMatricule(id: any) {
    
    this.paiementService.GetPaiementByMatriculePensionnaire(id).subscribe({
      next: (result) => {
        console.log("liste des paiement recu" , result)
        this.dataSource2 = new MatTableDataSource<any>(result)
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      },
      error(err) {
        console.log(err)
      },
    })
  }
  onSubmitCni(post: any) {
    this.cni = post;
   if (this.selection.isEmpty()){
      this.paiement(this.cni.cni, this.post[0].matriculePensionnaire)
    }
    else{
     this.paiementParIdPensionnaire(this.cni.cni, this.post[0].matriculePensionnaire)   
     
    }
    
  }
  paiementParIdPensionnaire(cni: any, matricule: string):any {
   
    var map = this.selection.selected;

    map.forEach(element => {
      this.ids.push(element.id)
      
    });
    this.paiementInput = {
      "cni": String(cni),
      "id": this.ids
    }
    this.paiementService.SavePaiementByListIdPensionnaire(this.paiementInput).subscribe({
      next: (result) => {
        this.paiementData = result;
        this.sharedService.setPaiementData(this.paiementData)
        this.notification.showInfo("paiement enregistrer", "paiement")
        return this.paiementData
      },
      error: (err: HttpErrorResponse) => {
        this.notification.showError(err.error, "Erreur paiement")
      },
      complete: () => {
        this.ids = [];
        document.getElementById('AddExpense').click(); 
        this.OpenValidationModal();
      }
    })


}

paiement(cni: any, matricule: string) {

    this.paiementInput = {
      "cni": String(cni),
      "matricule": matricule
    }
    this.paiementService.Save(this.paiementInput).subscribe({
      next: (result) => {
        if (result != null) {
          this.paiementData = result;
          this.sharedService.setPaiementData(this.paiementData)
        }
        this.notification.showInfo("paiement enregistrer", "paiement")

      },
      error: (err: HttpErrorResponse) => {
        this.notification.showError(err.error, "Erreur paiement")
      },
      complete: () => {
        document.getElementById('AddExpense').click(); 
       this.OpenValidationModal();
      }
    })
   
}

  selectHandler(row: any) {
    if (this.displayType == SelectType.tous) {
      this.selection.isSelected(row)
    }
    if (this.displayType == SelectType.single) {
      if (!this.selection.isSelected(row)) {
        this.selection.clear();
      }
    }
    this.selection.toggle(row);
  }

  onChange(typeValue: number) {
    this.displayType = typeValue;
    this.selection.clear();
  }
  OpenValidationModal(){
    
      this.dialog.open(ValidationPaiementComponent, {
        width: '60%',
        data: {
          paiements: this.paiementData
          
        }
      }
    
      );

    

  }


}
