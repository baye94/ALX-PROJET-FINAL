import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { PensionnaireService } from '@services/pensionnaire.service';
import { TokenService } from '@services/token.service';
import { format } from 'path';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
const URL = 'https://127.0.0.1:7119/api/Pensionnaire/AddPensionnaire';
@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {
name: any;
  file:any;
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;
  ngOnInit(): void {
       }
 

   constructor(private _formBuilder: FormBuilder , private pensionnaireService:PensionnaireService ,private http: HttpClient ,private tokenService:TokenService) {}

//   ngOnInit(): void {
//   }
//   name:string=""
//   file:any;

//   uploader: FileUploader = new FileUploader({ url: "https://127.0.0.1:7119/api/Pensionnaire/AddPensionnaire", removeAfterUpload: false, autoUpload: true });

getFile(event: any){
  this.file = event.target.files[0];
  console.log("fileee" , this.file);
}
getName(name:string){
  this.name = name;
}
uploadProgress:any;
uploadMessage:any;






 uploadStudentGradesReport(filename: string, frmData: FormData): Observable<any> {
  const url = 'https://127.0.0.1:7119/api/Pensionnaire/AddPensionnaire';
  const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  if (frmData) {
    console.log('ready to post ' + url + ' filename: ' + filename + ' options ' + headers);

    return this.http.post(url, frmData, { headers:headers });
  }
}
SubmitData(){
  let formData = new FormData();
  console.log("fffffffff", this.file)
   formData.set('file', this.file);
   formData.append('file',this.file)
   console.log("fffffffff", formData.getAll('file'))
   var f = formData.getAll('file');
  this.uploadStudentGradesReport("fall", formData)
  // let formData = new FormData;
//   const formData = new FormData();
//   formData.append('file',this.file);
//   let headers = new HttpHeaders();
//   headers = headers.append('Content-Type:', 'multipart/form-data');
//   return this.http.post('https://127.0.0.1:7119/api/Pensionnaire/AddPensionnaire', formData, { headers: headers })  
// .subscribe({
//     next:(value) => {
      
//     },
//     error(err) {
//       console.log(err);
//     },
//   })

}




uploader:FileUploader;
hasBaseDropZoneOver:boolean;
hasAnotherDropZoneOver:boolean;
response:string;



public fileOverBase(e:any):void {
  this.hasBaseDropZoneOver = e;
}

public fileOverAnother(e:any):void {
  this.hasAnotherDropZoneOver = e;
}
  
}


