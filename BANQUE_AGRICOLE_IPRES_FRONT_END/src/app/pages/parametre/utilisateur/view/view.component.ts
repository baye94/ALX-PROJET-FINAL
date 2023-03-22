import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';
import { DesactivationComponent } from '../desactivation/desactivation.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewUtilisateurComponent implements OnInit {
trustedUrl: any;
dangerousUrl: any;

 userData:any;
 UserDataSource:any;
 displayedColumns:string[] = ['num','email','prenom','nom','userName' ,'status','action']

  constructor(  private dialog:MatDialog,private service:UserService,notification:NotificationService) { }

  ngOnInit(): void {
    this.service.RequiredRefresh.subscribe(r => {
      this.GetAllUsers();
    })
    this.GetAllUsers();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.UserDataSource.filter = filvalue;
    
  }
  FilterStatus(id : any) {
    
    localStorage.removeItem('token');
    // console.log("   data checked" , id)
    
  }

   GetAllUsers(){
    this.service.GetAllUser().subscribe({
      next: (value) => {
        console.log("liste des utilisateur" , value);
        this.userData = value ,
        this.UserDataSource = new MatTableDataSource<any>(this.userData);
        this.UserDataSource.paginator = this.paginator;
        this.UserDataSource.sort =this.sort;

      },
      error: (err) => {

      },
      complete() {
        
      },
    })

   }
   SaveMetaData(id: any) {
    localStorage.setItem('idUser',id);
    }
    // OpenDialogCreate(){

    // }

    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => { this.router.navigate(['Your actualComponent']); });

    OpenDialogCreate(enteranimation: any, exitanimation: any,code:any ,status:any) {

      this.dialog.open(DesactivationComponent, {
        enterAnimationDuration: enteranimation,
        exitAnimationDuration: exitanimation,
        width: "20%",
        data:{
          idUser: code,
          status: status,
        }
      })
    }
    
}

