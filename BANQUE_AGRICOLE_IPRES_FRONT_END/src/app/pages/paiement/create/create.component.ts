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
import { TokenService } from '@services/token.service';
export interface User {
  matricule: string;
}

export enum SelectType {
  single,
  multiple,
  tous
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreatePaiementComponent implements OnInit {
  formGroup: FormGroup;
  formGroupCni: FormGroup;
  titleAlert: string = 'Champs obligatoire';
  post: any = '';
  guichetData: IGuichet;
  dataSource: any;
  empdata: any;
  cni: any;
  paiementInput: any;
  paiementInput2: any;
  paiementData: any;
  nom: any;
  date = Date.now();
  username: any
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  matricule = new FormControl<string | User>('');
  options: User[]
  filteredOptions: Observable<User[]>;
  selectType = [
    { text: "Single", value: SelectType.single },
    { text: "Multiple", value: SelectType.multiple },
    { text: "tous", value: SelectType.tous }
  ];
  ids: string[] = [];
  ids2: string[] = [];
  sharedData: string;
  data: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private token:TokenService ,private router:Router,private sharedService:SharedService ,private notification: NotificationService, private formBuilder: FormBuilder, private paiementService: PaiementService, private notificationService: NotificationService, private pensionnnaire: PensionnaireService) { }

  ngOnInit() {
    this.token.clearTokenExpired();
    this.createForm();
    this.createFormCni();
    this.GetAllMatriculePensionnaire();

    this.pensionnnaire.RequiredRefresh.subscribe(r => {
      this.GetAllMatriculePensionnaire();

    })
    this.sharedService.sharedData$
    .subscribe(sharedData => this.sharedData = sharedData);

  }
  displayedColumns: string[] = ['select', 'salaire', 'datepaie'];
  displayedColumnsPaiement: string[] = ['evenement', 'montant', 'idUser', 'dateCreation', 'datePaiement'];
  dataSource2: any;
  idPensionnaires: string[];
  selectedOptions = [];
  selectedOption;
  selection = new SelectionModel<any>(true, []);
  displayType = SelectType.multiple;

  displayFn(user: User): string {
    return user && user.matricule ? user.matricule : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.matricule.toLowerCase().includes(filterValue));
  }

  onNgModelChange($event) {
    console.log($event);
    this.selectedOption = $event;

  }

  GetAllMatriculePensionnaire() {
    this.pensionnnaire.GetAllMatriculePensionnaire().subscribe({
      next: (value) => {
        this.options = value;
        console.log("retour option", this.options);
        this.filteredOptions = this.name.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.matricule;
            return name ? this._filter(name as string) : this.options.slice();
          }),
        );
      },
      error(err) {

      },
      complete() {

      },
    })
  }
  GetPAiementByMatricule(id: any) {
    console.log("sortie ", this.post.matricule)
    this.paiementService.GetPaiementByMatriculePensionnaire(id).subscribe({
      next: (result) => {
        this.dataSource2 = new MatTableDataSource<any>(result)
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        console.log("resulteeeeeeee", result);
      },
      error(err) {
        console.log(err)
      },
    })
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      'matricule1': [null, Validators.required],
    });
  }
  createFormCni() {
    this.formGroupCni = this.formBuilder.group({
      'cni': [null, Validators.required],
    });
  }
  getPaiementUserName(id: any) {
    this.paiementService.getPaiementUsersName(id).subscribe({
      next: (result) => {
        this.username = result;

        console.log("Test Username", this.username)
      }
    })
  }
  onSubmit(post: any) {
    this.post = post;
    localStorage.setItem("fall" ,this.post.matricule1.matricule)
    console.log("log de post", this.post.matricule1.matricule);
    this.GetPAiementByMatricule(this.post.matricule1.matricule);
    if (this.post.length != 0) {
      console.log("sortie ", this.post.matricule1.matricule)
      this.paiementService.getPaiement(this.post.matricule1.matricule).subscribe({
        next: (result) => {
          // if (result != null) {

            console.log("typesOfShoes", this.typesOfShoes)
            
            this.post = result;
          //  this.sharedService.setdat(this.post);
           this.sharedService.setdat(result);
            this.dataSource = new MatTableDataSource<any>(this.post)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            if (this.post.length != 0) {
              this.nom = this.post[0]?.prenom + "  " + this.post[0]?.nom;
            }
            else {
              this.nom = "";
              this.notificationService.showInfo("Les paiements de ce pensionnaire sont á jours", "Paiement")
            }
            this.nom = this.post[0]?.prenom + "  " + this.post[0]?.nom;
            console.log("data source", this.dataSource)
            console.log("resultat post sortie", this.post)
            return this.post
          // }

        },
        error(err) {
          console.log(err);
        },
        complete: () => {
         
            
              this.router.navigateByUrl('/listepaiementpensionnaire')

        },


      });

    }

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
  get name() {
    return this.formGroup.get('matricule1') as FormControl
  }
  get name2() {
    return this.formGroupCni.get('cni') as FormControl
  }
  getPaiement(matricule: any): any {
    this.paiementService.getPaiement(matricule).subscribe(result => {
      console.log("result", result)
      return result
    });

  }

  paiementParIdPensionnaire(cni: any, matricule: string) {
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
          this.notification.showSuccess("paiement enregistrer", "paiement")
        },
        error: (err: HttpErrorResponse) => {
          this.notification.showError(err.error, "Erreur paiement")
        },
        complete: () => {

        }
      })
  

  }
  

  paiement(cni: any, matricule: string) {

    // if (this.selection.selected == null) {
      this.paiementInput = {
        "cni": String(cni),
        "matricule": matricule
      }
      this.paiementService.Save(this.paiementInput).subscribe({
        next: (result) => {
          if (result != null) {
            this.paiementData = result;
            console.log("this.paiementData", this.paiementData)
            console.log("value", result)
          }
          this.notification.showSuccess("paiement enregistrer", "paiement")
  
        },
        error: (err: HttpErrorResponse) => {
          this.notification.showError(err.error, "Erreur paiement")
        },
        complete: () => {
  
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

}
