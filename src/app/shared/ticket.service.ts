import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EndPoints } from './endpoints.class';
import * as moment from 'jalali-moment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  newTicket(data) {
    return this.http.post(EndPoints.tickets, data);
  }

  ticketList(pageNumber:number, pageSize:number, fromDate:moment.Moment | null, toDate:moment.Moment | null, importanceLevel?) {
    const params = {}
    params['pageNumber'] = pageNumber.toString();
    params['pageSize'] = pageSize.toString();
    fromDate ? params['fromDate'] = this.convertPersianToGregorian(fromDate): '';
    toDate ? params['toDate'] = this.convertPersianToGregorian(toDate) : '';
    importanceLevel ? params['importanceLevel'] = importanceLevel : '';

    return this.http.get(EndPoints.tickets, { params });
  }

  convertPersianToGregorian(persianDate:moment.Moment):string{
    return moment.from(persianDate.format(),'fa','YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZ');
  }
}
