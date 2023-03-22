import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    user: any;
    constructor(private route: Router, private token: TokenService) { }
    ngOnInit() {
        this.token.clearTokenExpired();
        const current = new Date();
        // current.setHours(0)

        // current.setMinutes(0)

        // current.setSeconds(0)

        // current.setMilliseconds(0)
        console.log("je suis dans au commencement",Math.floor(Date.now()/1000));

    }

}
