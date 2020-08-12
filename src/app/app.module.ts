import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/modules/material/material.module';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuccessDialogComponent } from './new-ticket/success-dialog/success-dialog.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPersianPaginatorIntl } from './shared/persian-paginator-intl';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './shared/material.persian-date.adapter';
import { TicketCommentsComponent } from './ticket-comments/ticket-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTicketComponent,
    SuccessDialogComponent,
    TicketsListComponent,
    TicketCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl() },
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }

  ],
  entryComponents: [
    SuccessDialogComponent,
    TicketCommentsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
