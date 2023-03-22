import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-desactivation',
  templateUrl: './desactivation.component.html',
  styleUrls: ['./desactivation.component.scss']
})
export class DesactivationComponent implements OnInit {
   idUser:any;
   status:any;

  constructor(  private router: Router  ,private notification: NotificationService ,private userService:UserService , public dialogref: MatDialogRef<DesactivationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.idUser != null && this.data.idUser != '') {
      console.log("modal is back " , this.data);
       this.idUser = this.data.idUser;
       this.status = this.data.status;
     
      
    }
    
  }

  Deactivate(){
    let input:any;
    if (this.status == 1) {
      input ={
        "idUser": this.idUser,
        "status": 0
      }
      }else{
        input ={
          "idUser": this.idUser,
          "status": 1
      }
      
    }
    console.log("input " , input)
    this.userService.DesactivateAgent(input).subscribe({
      next: (value) => {
        this.notification.showSuccess("mise á jour status compte" ,"Compte")

      },
      error: (err:HttpErrorResponse) => {
        this.notification.showError(err.error.error, "Fermeture Compte")
      },
      complete: () => {
  this.router.navigateByUrl('/ViewUtilisateur');
      }
    })

  }

}
