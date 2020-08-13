import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EndPoints } from './endpoints.class';
import * as moment from 'jalali-moment';
import { Ticket } from './../shared/models/ticket.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  newTicket(data): Observable<any> {
    return this.http.post(EndPoints.tickets, data);
  }

  ticketList(
    pageNumber: number,
    pageSize: number,
    fromDate: moment.Moment | null,
    toDate: moment.Moment | null,
    importanceLevel?): Observable<Ticket[]> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    if (fromDate) {
      params = params.append('fromDate', this.convertPersianToGregorian(fromDate));
    }
    if (toDate) {
      params = params.append('toDate', this.convertPersianToGregorian(toDate));
    }
    if (importanceLevel) {
      params = params.append('importanceLevel', importanceLevel);
    }

    return this.http.get(EndPoints.tickets, { params })
      .pipe(map((res: any) => res.tickets));
  }


  creatComment(ticketID: number, owner: string, content: string): Observable<any> {
    return this.http.post(EndPoints.comments, { ticketID, owner, content });
  }

  convertPersianToGregorian(persianDate: moment.Moment): string {
    return moment.from(persianDate.format(), 'fa', 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss');
  }
}
