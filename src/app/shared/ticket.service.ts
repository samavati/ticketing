import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EndPoints } from './endpoints.class';
import * as moment from 'jalali-moment';
import { map } from 'rxjs/operators';
import { Ticket } from './../shared/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  newTicket(data) {
    return this.http.post(EndPoints.tickets, data);
  }

  ticketList(pageNumber: number, pageSize: number, fromDate: moment.Moment | null, toDate: moment.Moment | null, importanceLevel?) {
    const params = {}
    params['pageNumber'] = pageNumber.toString();
    params['pageSize'] = pageSize.toString();
    fromDate ? params['fromDate'] = this.convertPersianToGregorian(fromDate) : '';
    toDate ? params['toDate'] = this.convertPersianToGregorian(toDate) : '';
    importanceLevel ? params['importanceLevel'] = importanceLevel : '';

    return this.http.get(EndPoints.tickets, { params }).pipe(
      map((res: any) => {
        return res.tickets.map(ticket => new Ticket(
          ticket.ID,
          ticket.issuer,
          ticket.owner,
          ticket.subject,
          ticket.content,
          ticket.metadata,
          ticket.importanceLevel,
          ticket.status,
          ticket.comments,
          ticket.createdAt,
          ticket.modifiedAt));
      })
    );
  }

  convertPersianToGregorian(persianDate: moment.Moment): string {
    return moment.from(persianDate.format(), 'fa', 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
  }
}
