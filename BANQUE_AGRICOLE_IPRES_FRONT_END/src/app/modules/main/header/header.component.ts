import { ITokenUser } from '@/interfaces/user';
import { AppState } from '@/store/state';
import { ToggleControlSidebar, ToggleSidebarMenu } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { TokenService } from '@services/token.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-header navbar navbar-expand';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public searchForm: UntypedFormGroup;
    public user: ITokenUser;

    constructor(
        private appService: AppService,
        private store: Store<AppState>,
        private tokenservice: TokenService
    ) { }
    Permission: any;
    i: any
    roles: any;
    ngOnInit() {
        this.user = this.tokenservice.getPayload();
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.navbarVariant}`;

        });
        this.searchForm = new UntypedFormGroup({
            search: new UntypedFormControl(null)
        });
        this.AffichageNotification();
        console.log("1", this.Permission)
        console.log("i", this.i)

    }

    logout() {
        this.appService.logout();
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }

    onToggleControlSidebar() {
        this.store.dispatch(new ToggleControlSidebar());
    }

    AffichageNotification(): any {
        this.roles = this.user.role ?? [];
        for (let index = 0; index < this.roles.length; index++) {
            const element = this.roles[index];
            if (this.roles[index].toString() == "supprimer paiement" || this.roles[index] == "super admin" || this.roles[index] == "admin") {

                this.Permission = true

            }

        }

    }
}
