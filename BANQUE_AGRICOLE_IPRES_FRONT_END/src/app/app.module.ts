import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import { ParametreComponent } from "@pages/parametre/parametre.component";
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { AgenceComponent } from "@pages/agence/agence.component";
import { PensionnaireComponent } from "@pages/pensionnaire/pensionnaire.component";
import { ModalpopupComponent } from './modules/page/modalpopup/modalpopup.component';
import {MatIconModule  } from "@angular/material/icon";
import {MatCardModule  } from "@angular/material/card";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GuichetComponent } from '@pages/guichet/guichet.component';
import {  MatStepperModule  } from "@angular/material/stepper";
import { CreateGuichetComponent } from '@pages/guichet/create/create.component';
import { EditGuichetComponent } from '@pages/guichet/edit/edit.component';
import { ViewGuichetComponent } from '@pages/guichet/view/view.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import {AgenceExtractionComponent} from "@pages/extraction/agence/agence.component";
import { PaiementComponent } from "@pages/paiement/paiement.component";
import { ViewPensionnaireComponent } from "@pages/pensionnaire/view/view.component";
import { PartenaireComponent } from './pages/partenaire/partenaire.component';
import { CreatePartenaireComponent } from './pages/partenaire/create/create.component';
import { EditComponent } from './pages/partenaire/edit/edit.component';
import {NgxPrintModule} from 'ngx-print';
import { CreatePaiementComponent } from "@pages/paiement/create/create.component";
import { ViewPartenaireComponent } from './pages/partenaire/view/view.component';
import { PartenaireAgenceComponent } from './pages/partenaire/partenaire-agence/partenaire-agence.component';
import { PartenaireAgenceGuichetComponent } from './pages/partenaire/partenaire-agence-guichet/partenaire-agence-guichet.component';
import { BilanPartenaireComponent } from './pages/partenaire/bilan/bilan.component';
import {  MatAutocompleteModule } from "@angular/material/autocomplete";
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatListModule } from "@angular/material/list";
import { ViewFichierComponent } from '@pages/parametre/ParametrageFichier/view/view.component';
import { UploadfileComponent } from './pages/parametre/ParametrageFichier/uploadfile/uploadfile.component';
import { DetailUploadFichierComponent } from './pages/parametre/ParametrageFichier/detail-upload-fichier/detail-upload-fichier.component';
import { CreateUtilisateurComponent } from './pages/parametre/utilisateur/create/create.component';
import { ViewUtilisateurComponent } from './pages/parametre/utilisateur/view/view.component';
import { DetailUtilisateurComponent } from './pages/parametre/utilisateur/detail-utilisateur/detail-utilisateur.component';
import { GuichetAgentComponent } from './pages/parametre/utilisateur/guichet-agent/guichet-agent.component';
import { RoleUtilisateurComponent } from './pages/parametre/utilisateur/role-utilisateur/role-utilisateur.component';
import {MatSelectModule} from '@angular/material/select';
import { DesactivationComponent } from './pages/parametre/utilisateur/desactivation/desactivation.component';
import { OuvertureFermetureSessionComponent } from './pages/parametre/ouverture-fermeture-session/ouverture-fermeture-session.component';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  } from '@angular-material-components/datetime-picker';
import { BilanAgentComponent } from './pages/parametre/utilisateur/bilan-agent/bilan-agent.component';
import { AnnulerPaiementModalComponent } from './modules/main/header/notifications/annuler-paiement-modal/annuler-paiement-modal.component';
import { DemandeAnnulationPaiementComponent } from './pages/paiement/demande-annulation-paiement/demande-annulation-paiement.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ListNotificationComponent } from './modules/main/header/notifications/list-notification/list-notification.component';
import { ViewPaiementDetailComponent } from './modules/main/header/notifications/view-paiement-detail/view-paiement-detail.component';
import { ListePaiementPensionnaireComponent } from './pages/paiement/liste-paiement-pensionnaire/liste-paiement-pensionnaire.component';
import { SharedService } from '@services/shared.service';
import { ValidationPaiementComponent } from './pages/paiement/validation-paiement/validation-paiement.component';
import { NgxPrintElementModule } from 'ngx-print-element';

import { AreaComponent } from '@pages/widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from '@pages/widgets/card/card.component';
import { PieComponent } from '@pages/widgets/pie/pie.component';
import { PasswordAgentComponent } from './pages/parametre/utilisateur/password-agent/password-agent.component';
import { LoginAgentComponent } from './pages/parametre/utilisateur/login-agent/login-agent.component';
import { InformationPersonnelleComponent } from './pages/parametre/utilisateur/information-personnelle/information-personnelle.component';
import { EmailAgentComponent } from "@pages/parametre/utilisateur/email-agent/email-agent.component";
import { CreateAgenceComponent } from '@pages/agence/create/create.component';
import {
    NgxUiLoaderModule,
    NgxUiLoaderConfig,
    SPINNER,
    POSITION,
    PB_DIRECTION,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule
  } from 'ngx-ui-loader';
import { AgentComponent } from './pages/agent/agent.component';
import { DetailAgentsComponent } from './pages/agent/detail-agents/detail-agents.component';
import { DesactiveGuichetComponent } from './pages/guichet/desactive-guichet/desactive-guichet.component';
import { DesactiveAgenceComponent } from './pages/agence/desactive-agence/desactive-agence.component';
import { BilanAgenceComponent } from './pages/agence/bilan-agence/bilan-agence.component';
import { BilanGuichetComponent } from './pages/guichet/bilan-guichet/bilan-guichet.component';
import { ViewAgenceComponent } from "./pages/agence/view/view.component";

defineCustomElements();
registerLocaleData(localeEn, 'en-EN');
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    // "bgsColor": "#ffffff",
//   "bgsOpacity": 0.5,
//   "bgsPosition": "bottom-right",
//   "bgsSize": 60,
//   "bgsType": "ball-spin-clockwise",
  "blur": 0,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#CAD402",
  "fgsPosition": "center-center",
  "fgsSize": 150,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
   "overlayColor": "rgba(255,255,255,0.2)",
  "pbColor": "#CAD402",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300

  };

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        

        AgenceComponent,
        PensionnaireComponent,
        ModalpopupComponent,
        GuichetComponent,
        CreateGuichetComponent,
        EditGuichetComponent,
        ViewGuichetComponent,
        AgenceExtractionComponent,
        PaiementComponent,
        ViewPensionnaireComponent,
        ParametreComponent,
        PartenaireComponent,
        CreatePartenaireComponent,
        EditComponent,
        CreatePaiementComponent,
        ViewPartenaireComponent,
        PartenaireAgenceComponent,
        PartenaireAgenceGuichetComponent,
        BilanPartenaireComponent,
        ViewFichierComponent,
        UploadfileComponent,
        DetailUploadFichierComponent,
        CreateUtilisateurComponent,
        ViewUtilisateurComponent,
        DetailUtilisateurComponent,
        GuichetAgentComponent,
        RoleUtilisateurComponent,
        DesactivationComponent,
        OuvertureFermetureSessionComponent,
        BilanAgentComponent,
        AnnulerPaiementModalComponent,
        DemandeAnnulationPaiementComponent,
        ListNotificationComponent,
        ViewPaiementDetailComponent,
        ListePaiementPensionnaireComponent,
        ValidationPaiementComponent,
        AreaComponent,
        CardComponent,
        PieComponent,
        PasswordAgentComponent,
        LoginAgentComponent,
        InformationPersonnelleComponent,
        EmailAgentComponent,
        CreateAgenceComponent,
        AgentComponent,
        DetailAgentsComponent,
        DesactiveGuichetComponent,
        DesactiveAgenceComponent,
        BilanAgenceComponent,
        BilanGuichetComponent,
        ViewAgenceComponent
        
        
       
        
        
        
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,

        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        FontAwesomeModule,
        MatStepperModule,
        MatToolbarModule,
        NgxPrintModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FileUploadModule,
        MatProgressBarModule,
        MatListModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
        MatExpansionModule,
        NgxPrintElementModule,
        HighchartsChartModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule, 
        NgxUiLoaderHttpModule.forRoot({ showForeground: true })
        
      
        

      

        
    ],
    exports:[
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatStepperModule,
        MatToolbarModule,
       
        MatNativeDateModule,
        AreaComponent,
        CardComponent,
        PieComponent
        
        
        
        
    ],
    providers: [
        
        DatePipe,
        SharedService
        
       
    ],
    bootstrap: [AppComponent],

    
})
export class AppModule {}
