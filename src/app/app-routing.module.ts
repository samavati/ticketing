import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

const routes: Routes = [
  { path: '', component: NewTicketComponent },
  { path: 'tickets-list', component: TicketsListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
