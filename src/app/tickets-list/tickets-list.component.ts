import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from '../shared/ticket.service';
import * as moment from 'jalali-moment';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';

export interface PeriodicElement {
  createdAt: string;
  subject: number;
  importanceLevel: number;
  status: string;
}

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['subject', 'createdAt', 'importanceLevel', 'status'];
  dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatDateRangeInput, { static: true }) dateRange: MatDateRangeInput<moment.Moment>;
  @ViewChild(MatSelect, { static: true }) select: MatSelect;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private ticketService: TicketService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.makeTheList(1);
    this.onDateRangeChange();
  }

  async makeTheList(pageNumber: number) {
    const data: any = await this.ticketService.ticketList(pageNumber, 99999999999, this.dateRange.value.start, this.dateRange.value.end, this.select.value).toPromise();
    this.dataSource = new MatTableDataSource<PeriodicElement>(data as PeriodicElement[]);
    this.dataSource.paginator = this.paginator;
  }

  onDateRangeChange() {
    this.dateRange.stateChanges.subscribe(res => {
      if (this.range.valid) {
        this.makeTheList(1);
      }
    });
  }

  onSelectChange() {
    this.makeTheList(1);
  }
}