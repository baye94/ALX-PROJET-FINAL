import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-bilan-agence',
  templateUrl: './bilan-agence.component.html',
  styleUrls: ['./bilan-agence.component.scss']
})
export class BilanAgenceComponent implements OnInit {

  constructor(private token:TokenService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.token.clearTokenExpired();
  }

}
