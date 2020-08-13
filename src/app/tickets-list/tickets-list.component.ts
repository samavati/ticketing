import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from '../shared/ticket.service';
import * as moment from 'jalali-moment';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { Ticket } from '../shared/models/ticket.model';
import { MatDialog } from '@angular/material/dialog';
import { TicketCommentsComponent } from '../ticket-comments/ticket-comments.component';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['subject', 'createdAt', 'importanceLevel', 'status'];
  dataSource;
  isSeraching = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatDateRangeInput, { static: true }) dateRange: MatDateRangeInput<moment.Moment>;
  @ViewChild(MatSelect, { static: true }) select: MatSelect;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    public ticketService: TicketService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.makeTheList(1);
    this.onDateRangeChange();
  }

  async makeTheList(pageNumber: number): Promise<void> {
    this.isSeraching = true;
    const datas = await this.ticketService.ticketList(
      pageNumber,
      99999999999,
      this.dateRange.value.start,
      this.dateRange.value.end,
      this.select.value
    ).toPromise();
    this.isSeraching = false;
    this.dataSource = new MatTableDataSource<Ticket>(datas);
    this.dataSource.paginator = this.paginator;
  }

  onDateRangeChange(): void {
    this.dateRange.stateChanges.subscribe(res => {
      if (this.range.valid) {
        this.makeTheList(1);
      }
    });
  }

  onSelectChange(): void {
    this.makeTheList(1);
  }

  openDialog(ticket: Ticket): void {
    this.dialog.open(TicketCommentsComponent, {
      width: '100%',
      data: { ticket }
    });
  }
}
