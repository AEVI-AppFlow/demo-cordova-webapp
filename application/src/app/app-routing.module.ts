import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/pages/home/home.component';
import { OverviewComponent } from './views/pages/overview/overview.component';
import { FlowServicesComponent } from './views/pages/flow-services/flow-services.component';
import { PaymentComponent } from './views/pages/payment/payment.component';
import { NonPaymentComponent } from './views/pages/non-payment/non-payment.component';
import { EventsComponent } from './views/pages/events/events.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'services', component: FlowServicesComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'nonpayments', component: NonPaymentComponent },
  { path: 'events', component: EventsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
