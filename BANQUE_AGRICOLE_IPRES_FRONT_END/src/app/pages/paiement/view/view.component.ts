import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor( private token:TokenService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
  }

}
