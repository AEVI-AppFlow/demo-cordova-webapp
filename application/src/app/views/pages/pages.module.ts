import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

import { ComponentsModule } from '../../components/components.module';

import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { NonPaymentComponent } from './non-payment/non-payment.component';
import { OverviewComponent } from './overview/overview.component';
import { FlowServicesComponent } from './flow-services/flow-services.component';
import { EventsComponent } from './events/events.component';
import { FlowConfigComponent } from 'src/app/components/flow-config/flow-config.component';
import { FlowServiceComponent } from 'src/app/components/flow-service/flow-service.component';
import { PaymentResponseComponent } from 'src/app/components/payment-response/payment-response.component';
import { ResponseComponent } from 'src/app/components/response/response.component';
import { FlowExceptionComponent } from 'src/app/components/flow-exception/flow-exception.component';

@NgModule({
    declarations: [
        HomeComponent,
        PaymentComponent,
        NonPaymentComponent,
        OverviewComponent,
        FlowServicesComponent,
        EventsComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        FontAwesomeModule
    ],
    entryComponents:[
        FlowConfigComponent,
        FlowServiceComponent,
        PaymentResponseComponent,
        ResponseComponent,
        FlowExceptionComponent
    ],
    providers: []
})
export class PagesModule {
}
