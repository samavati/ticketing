import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../shared/models/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { FormControl } from '@angular/forms';
import { Comment } from '../shared/models/comment.model';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit, AfterViewInit {

  comment = new FormControl();
  comments: Comment[] = [];
  newComments: Comment[] = [];

  @ViewChild('dialogBody', { static: true }) dialogBody: ElementRef<HTMLDivElement>;

  constructor(
    public dialogRef: MatDialogRef<TicketCommentsComponent>,
    public ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: { ticket: Ticket }) { }

  ngOnInit(): void {
    this.comments = [...this.data.ticket.comments];
    this.comments.reverse();
  }

  ngAfterViewInit(): void {
    this.dialogBody.nativeElement.scrollTop = this.dialogBody.nativeElement.scrollHeight;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isSupportComment(email: string): boolean {
    const provider = email.substring(email.lastIndexOf('@') + 1);
    return provider === 'jibit.com';
  }

  onSend(): void {
    if (this.comment.value) {

      this.newComments.push({
        ticketID: this.data.ticket.ID,
        content: this.comment.value as string,
        owner: '',
        createdAt: moment().format(),
        metadata: '',
        modifiedAt: '',
      });

      setTimeout(() => {
        this.dialogBody.nativeElement.scrollTop = this.dialogBody.nativeElement.scrollHeight;
      }, 0);

      this.comment.setValue(null);
    }
  }
}
