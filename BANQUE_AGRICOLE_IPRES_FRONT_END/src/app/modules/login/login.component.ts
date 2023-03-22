import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '@services/app.service';
import { authService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'login-box';
  public loginForm: UntypedFormGroup;
  public isAuthLoading = false;
  public isGoogleLoading = false;
  public isFacebookLoading = false;
  formGroup: any;
  titleAlert: string;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private authService: authService,
    private tokenService: TokenService
  ) { }
  bbb: any;
  ngOnInit() {
    this.renderer.addClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, Validators.required),
      password: new UntypedFormControl(null, Validators.required)
    });
  }

  async loginByAuth(): Promise<void> {
    if (this.loginForm.valid) {
      this.isAuthLoading = true;
      console.log(this.loginForm)
        ; (await this.authService.login(this.loginForm.value)).subscribe({
          next: (data) => {
            if (data != null) {
              this.toastr.success("Connexion réuissi!");
              this.tokenService.saveToken(data.token)

            }

          },
          error: (err: HttpErrorResponse) => {
            this.toastr.error(err.error.errors, "Connexion");
            this.isAuthLoading = false;
            console.log(err.error.errors);
            console.log(err.error);
          }
        })

    } else {

      this.toastr.error('Formulaire invalide');
    }

  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "verifiez  cette partie svp";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('libelle') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {

    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }


  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
  }
}
