import { ITokenUser } from '@/interfaces/user';
import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { TokenService } from '@services/token.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user: ITokenUser;
    public menu = MENU;

    constructor(
        public appService: AppService,
        public tokenService: TokenService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.tokenService.getPayload();
        if (this.user?.role.includes("Agent")) {
            this.menu = MENUAGENT
        }
        if (this.user?.role.includes("super admin")) {
            this.menu = MENU
            
        }

        if (this.user?.role.includes("admin LBA")) {
            this.menu = MENUADMIN
        }
        if (this.user?.role.includes("chef agence")) {
            this.menu = MENUCHEFAGENCE
        }

    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Parametre',
        iconClasses: 'fas fa-wrench',
        path: ['/parametre']
    },

    {
        name: 'Agence',
        iconClasses: 'fas fa-building',
        path: ['/agence']

    },
    {
        name: 'Guichet',
        iconClasses: 'fas fa-cash-register',
        path: ['/guichet'],

    },
    {
        name: 'Agent',
        iconClasses: 'fas fa-users',
        path: ['/listagent'],

    },
    {
        name: 'Partenaire',
        iconClasses: 'fas fa-handshake',
        path: ['/partenaire']

    },
    {
        name: 'Pensionnaire',
        iconClasses: 'fas fa-folder',
        path: ['/pensionnaire']

    },
    {
        name: 'Paiement',
        iconClasses: 'fas fa-money-bill',
        path: ['/paiement']

    },

];

export const MENUAGENT = [

    {
        name: 'Pensionnaire',
        iconClasses: 'fas fa-folder',
        path: ['/pensionnaire']

    },
    {
        name: 'Paiement',
        iconClasses: 'fas fa-money-bill',
        path: ['/paiement']

    },

];

export const MENUCHEFAGENCE = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    

    {
        name: 'Agence',
        iconClasses: 'fas fa-building',
        path: ['/agence']

    },
    {
        name: 'Guichet',
        iconClasses: 'fas fa-cash-register',
        path: ['/guichet'],

    },
    {
        name: 'Agent',
        iconClasses: 'fas fa-users',
        path: ['/ViewUtilisateur'],

    },
    {
        name: 'Pensionnaire',
        iconClasses: 'fas fa-folder',
        path: ['/pensionnaire']

    },
    {
        name: 'Paiement',
        iconClasses: 'fas fa-money-bill',
        path: ['/paiement']

    },

];
export const MENUADMIN = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },

    {
        name: 'Agence',
        iconClasses: 'fas fa-building',
        path: ['/agence']

    },
    {
        name: 'Guichet',
        iconClasses: 'fas fa-cash-register',
        path: ['/guichet'],

    },
    {
        name: 'Agent',
        iconClasses: 'fas fa-users',
        path: ['/ViewUtilisateur'],

    },

    {
        name: 'Pensionnaire',
        iconClasses: 'fas fa-folder',
        path: ['/pensionnaire']

    },
    {
        name: 'Paiement',
        iconClasses: 'fas fa-money-bill',
        path: ['/paiement']

    },

];
