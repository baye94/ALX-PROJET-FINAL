import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaiementService } from '@services/paiement.service';
import { AnnulerPaiementModalComponent } from './annuler-paiement-modal/annuler-paiement-modal.component';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  totalMessage: any;
  messageData: any;
  deuxieme: any;
  troisieme: any;
  premiere: any;
  demamdes: any;
  fermerNotif:any=0;

  animal: string;
  name: string;
  constructor(public dialog: MatDialog, private paiementService: PaiementService) { }
  ngOnInit(): void {
    this.paiementService.RequiredRefresh.subscribe(r => {
      this.GetAllMessage()
    })
    this.GetAllMessage()

  }
  GetDemande(input: any): any {
    this.demamdes = input;
    return this.demamdes;

  }

  GetAllMessage() {
    this.paiementService.GetMessagesAnnulationPaiement().subscribe({
      next: (value) => {
        this.messageData = value;
        this.totalMessage = this.messageData?.length;
        this.premiere = this.messageData[0]
        this.deuxieme = this.messageData[1];
        this.troisieme = this.messageData[2];
      }
    })
  }

  openDialog(input: any): any {
    this.fermerNotif = 1;
    this.dialog.open(AnnulerPaiementModalComponent, {
      width: '70%',
      data: {
        demande: input
      }
    }
  
    );

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', input);
    // });
  }

}
