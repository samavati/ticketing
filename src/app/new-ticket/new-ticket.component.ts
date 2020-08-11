import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketService } from './../shared/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  constructor(private ticketService: TicketService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  form: FormGroup = new FormGroup({
    issuer: new FormControl('ticketing', Validators.required),
    owner: new FormControl('customer@example.com', Validators.required),
    subject: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    metadata: new FormControl(null),
    importanceLevel: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
  }


  submitForm() {
    this.ticketService.newTicket({
      issuer: this.form.get('issuer').value,
      owner: this.form.get('owner').value,
      subject: this.form.get('subject').value,
      content: this.form.get('content').value,
      metadata: this.form.get('metadata').value,
      importanceLevel: this.form.get('importanceLevel').value
    }).subscribe(res => {
      this.openDialog();
    },
      error => {
        this.snackBar.open('در ذخیره تیکت شما خطایی پیش آمده لطفا مجدد تلاش نمایید', 'باشه', {
          duration: 2000,
        })
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: 'auto',
    });
  }

}
