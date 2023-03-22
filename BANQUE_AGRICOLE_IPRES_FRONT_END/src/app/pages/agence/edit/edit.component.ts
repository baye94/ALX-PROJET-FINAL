import { Component, OnInit } from '@angular/core';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private token: TokenService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
  }

}
