import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DesactivationComponent } from '@pages/parametre/utilisateur/desactivation/desactivation.component';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  trustedUrl: any;
dangerousUrl: any;

 userData:any;
 UserDataSource:any;
 displayedColumns:string[] = ['num','email','prenom','nom','userName' ,'status','action']

  constructor(private token:TokenService , private dialog:MatDialog,private service:UserService,notification:NotificationService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
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
