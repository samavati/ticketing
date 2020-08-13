import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment.model';
import { TicketService } from 'src/app/shared/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() ticketId: number;
  constructor(
    public ticketService: TicketService,
    private snackBar: MatSnackBar
  ) { }
  isSending = true;
  isRecieved = false;
  isFailed = false;

  ngOnInit(): void {
    this.ticketService.creatComment(this.ticketId, 'ehsan@jibit.com', this.comment.content)
      .subscribe(
        res => {
          this.isSending = false;
          this.isRecieved = true;
        },
        err => {
          this.isSending = false;
          this.isFailed = true;
          this.snackBar.open('خطا در ارسال پیام', 'باشه', {
            duration: 2000,
          });
        });
  }

}
