import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-ouverture-fermeture-session',
  templateUrl: './ouverture-fermeture-session.component.html',
  styleUrls: ['./ouverture-fermeture-session.component.scss']
})
export class OuvertureFermetureSessionComponent implements OnInit {

  myTimePicker: any;
  myTimePickerF: any;
  horaireData: any;
  ouverture: any;
  fermeture: any;
  ouvertureData: any;
  fermetureData: any;
  horaire: any = {
    "id": "",
    "ouverture": "",
    "fermeture": ""
  }

  constructor(private serviceApi: ApiService, private notification: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.GetHoraires();

  }
  getHours(date) {
    return date.getHours();
  }
  getMinutes(date) {
    return date.getMinutes();
  }

  GetHoraires() {
    this.serviceApi.GetHoraires().subscribe({
      next: (value) => {
        this.horaireData = value;
        if (this.horaireData[0]?.fermeture != null) {
          this.fermeture = this.horaireData[0]?.fermeture;
        } else { this.fermeture = 0 }
        if (this.horaireData[0]?.ouverture != null) {
          this.ouverture = this.horaireData[0]?.ouverture
        } else { this.ouverture = 0 }

      },
    })

  }
  HoraireOuverture() {
    var _horaire = this.getHours(this.myTimePicker) + ':' + this.getMinutes(this.myTimePicker);
    if (_horaire.length == 4) {
      _horaire = '0' + _horaire;
    }
    if (this.fermeture == 0) {
      this.fermeture = "0";
    }
    this.horaire = {
      "id": "",
      "ouverture": _horaire,
      "fermeture": this.fermeture
    }
    this.serviceApi.SaveHoraire(this.horaire).subscribe({
      next: (value) => {
        this.notification.showSuccess("Horaire d'ouverture mise á jours", "Horaire ouverture")
      },
      error: (err: HttpErrorResponse) => {
        this.notification.showError("Mise á jours horaire d'ouverture", "Erreur")
      },
      complete: () => {
        this.GetHoraires();
      }
    })

  }
  HoraireFermeture() {
    var _horaire = this.getHours(this.myTimePickerF) + ':' + this.getMinutes(this.myTimePickerF);
    if (_horaire.length == 4) {
      _horaire = '0' + _horaire;
    }
    if (this.ouverture == 0) {
      this.ouverture = "0";
    }
    this.horaire = {
      "id": "",
      "ouverture": this.ouverture,
      "fermeture": _horaire
    }
    console.log("loongueur ", _horaire, _horaire.length , this.ouverture)
    this.serviceApi.SaveHoraire(this.horaire).subscribe({
      next: (value) => {
        this.notification.showSuccess("Horaire fermeture mise á jours", "Horaire ouverture")
      },
      error: (err: HttpErrorResponse) => {
        this.notification.showError("Mise á jours horaire fermeture", "Erreur")
      },
      complete: () => {
        this.GetHoraires();
      }
    })
  }


}
