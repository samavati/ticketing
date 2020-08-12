import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../shared/models/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent {

  comment = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<TicketCommentsComponent>,
    public ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: { ticket: Ticket }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isSupportComment(email: string): boolean {
    const provider = email.substring(email.lastIndexOf('@') + 1);
    return provider === 'jibit.com';
  }

  onSend(): void {
    this.ticketService.creatComment(this.data.ticket.ID, 'ehsan@yahoo.com', this.comment.value)
      .subscribe(res => { });
  }

}
