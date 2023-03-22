import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FichierPaiementService } from '@services/fichierPaiement.service';
import { NotificationService } from '@services/notification.service';
import { PensionnaireService } from '@services/pensionnaire.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {

  name: any;
  file:any;
  isload = 0;
  progress = 0;
  uploadProgress:any;
  uploadMessage:any; 
  constructor(private http: HttpClient ,private tokenService:TokenService ,private notification:NotificationService , private fichierServicce:FichierPaiementService) { }

  ngOnInit(): void {
  }

  getFile(event: any){
    this.file = event.target.files[0];
    this.name = this.file.name.value;
    console.log("fileee" , this.file.name);
  }
  // getName(name:string){
  //   this.name = name;
  // }

  uploadExcelFile() {
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    let headers = new HttpHeaders({      
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    this.isload = 1;
    this.fichierServicce.UploadFile(formData) .subscribe({
      next: (event) => {
        
        if (event.type === HttpEventType.UploadProgress)
        {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        
        }
          
        else if (event.type === HttpEventType.Response) {
          this.uploadMessage = 'Upload success.';
        alert('Le fichier est télécharger avec success!!!' );
      }
    },
    error:  (err:HttpErrorResponse)  =>{
      this.notification.showError(err.error,"Fichier")
      this.isload = 0;
      console.log("erorrr" , err.error)
    }
    
    });
    // this.http.post('https://127.0.0.1:7119/api/Pensionnaire/AddPensionnaire', formData, { headers:headers ,reportProgress: true, observe: 'events'})
      // .subscribe({
      //   next: (event) => {
          
      //     if (event.type === HttpEventType.UploadProgress)
      //     {
      //       this.uploadProgress = Math.round(100 * event.loaded / event.total);
      //      console.log("progress" , this.progress);
      //      console.log("this.uploadProgress ", this.uploadProgress)
      //     }
            
      //     else if (event.type === HttpEventType.Response) {
      //       this.uploadMessage = 'Upload success.';
      //     alert('File uploaded successfully' );
      //     console.log(" this.uploadMessage" ,  this.uploadMessage)
      //   }
      // },
      // error:  (err:HttpErrorResponse)  =>{
      //   this.notification.showError(err.error,"Fichier")
      //   this.isload = 0;
      //   console.log("erorrr" , err.error)
      // }
      
      // });
  }

}
