import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { LoginComponent } from '@modules/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { MainMenuComponent } from '@pages/main-menu/main-menu.component';
import { SubMenuComponent } from '@pages/main-menu/sub-menu/sub-menu.component';
import { PaiementComponent } from '@pages/paiement/paiement.component';
import { AgenceComponent } from '@pages/agence/agence.component';
import { PensionnaireComponent } from '@pages/pensionnaire/pensionnaire.component';
import { ParametreComponent } from '@pages/parametre/parametre.component';
import { ExtractionComponent } from '@pages/extraction/extraction.component';
import { GuichetComponent } from '@pages/guichet/guichet.component';
import { ViewGuichetComponent } from '@pages/guichet/view/view.component';
import { AgenceExtractionComponent } from '@pages/extraction/agence/agence.component';
import { ViewPensionnaireComponent } from '@pages/pensionnaire/view/view.component';
import { PartenaireComponent } from '@pages/partenaire/partenaire.component';
import { CreatePartenaireComponent } from '@pages/partenaire/create/create.component';
import { CreatePaiementComponent } from '@pages/paiement/create/create.component';
import { ViewPartenaireComponent } from '@pages/partenaire/view/view.component';
import { BilanPartenaireComponent } from '@pages/partenaire/bilan/bilan.component';
import { ViewFichierComponent } from '@pages/parametre/ParametrageFichier/view/view.component';
import { UploadfileComponent } from '@pages/parametre/ParametrageFichier/uploadfile/uploadfile.component';
import { DetailUploadFichierComponent } from '@pages/parametre/ParametrageFichier/detail-upload-fichier/detail-upload-fichier.component';
import { CreateUtilisateurComponent } from '@pages/parametre/utilisateur/create/create.component';
import { ViewUtilisateurComponent } from '@pages/parametre/utilisateur/view/view.component';
import { DetailUtilisateurComponent } from '@pages/parametre/utilisateur/detail-utilisateur/detail-utilisateur.component';
import { OuvertureFermetureSessionComponent } from '@pages/parametre/ouverture-fermeture-session/ouverture-fermeture-session.component';
import { BilanAgentComponent } from '@pages/parametre/utilisateur/bilan-agent/bilan-agent.component';
import { ListNotificationComponent } from '@modules/main/header/notifications/list-notification/list-notification.component';
import { ListePaiementPensionnaireComponent } from '@pages/paiement/liste-paiement-pensionnaire/liste-paiement-pensionnaire.component';
import { ValidationPaiementComponent } from '@pages/paiement/validation-paiement/validation-paiement.component';
import { AgentComponent } from '@pages/agent/agent.component';
import { DetailAgentsComponent } from '@pages/agent/detail-agents/detail-agents.component';
import { ViewAgenceComponent } from '@pages/agence/view/view.component';
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'paiement',
                component: PaiementComponent
            },
            {
                path: 'agence',
                component: AgenceComponent
            },
            {
                path: 'pensionnaire',
                component: PensionnaireComponent
            },
            {
                path: 'parametre',
                component: ParametreComponent
            },
            {
                path: 'extraction',
                component: ExtractionComponent
            },
            {
                path: 'guichet',
                component: GuichetComponent
            },
            {
                path: 'viewGuichet',
                component: ViewGuichetComponent
            },
            {
                path: 'agenceExtraction',
                component: AgenceExtractionComponent
            },
            {
                path: 'pensionnaireView',
                component: ViewPensionnaireComponent
            },
            {
                path: 'partenaire',
                component: PartenaireComponent,
            },
            {
                path: 'createPartenaire',
                component: CreatePartenaireComponent
            },
            {
                path: 'CreatePaiement',
                component: CreatePaiementComponent
            },
            {
                path: 'viewPartenaire',
                component: ViewPartenaireComponent
            },
            {
                path: 'bilanPartenaire',
                component: BilanPartenaireComponent
            },
            {
                path: 'viewFichierComponent',
                component: ViewFichierComponent
            },
            {
                path: 'uploadfile',
                component: UploadfileComponent
            },
            {
                path: 'detailuploadFile',
                component: DetailUploadFichierComponent
            },
            {
                path: 'creationUtilisateur',
                component: CreateUtilisateurComponent
            },
            {
                path: 'ViewUtilisateur',
                component: ViewUtilisateurComponent
            },
            {
                path: 'DetailUtilisateur',
                component: DetailUtilisateurComponent
            },
            {
                path: 'ouverture/fermeture',
                component: OuvertureFermetureSessionComponent
            },
            {
                path: 'parametre',
                component: ParametreComponent
            },
            {
                path: 'bilanagent',
                component: BilanAgentComponent
            },
            {
                path: 'listenotification',
                component: ListNotificationComponent
            },
            {
                path: 'listepaiementpensionnaire',
                component: ListePaiementPensionnaireComponent
            },
            {
                path: 'validationpaiement',
                component: ValidationPaiementComponent
            },
            {
                path: 'listagent',
                component: AgentComponent
            },
            {
                path: 'detailAgent',
                component: DetailAgentsComponent
            },
            {
                path: 'viewAgenceComponent',
                component: ViewAgenceComponent
            }
           
            

        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
