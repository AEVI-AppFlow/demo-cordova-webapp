import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AmountFormatComponent } from './amount-format/amount-format.component';
import { AmountsDisplayComponent } from './amounts-display/amounts-display.component';
import { BasketComponent } from './basket/basket.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CustomerDisplayComponent } from './customer-display/customer-display.component';
import { FlowConfigComponent } from './flow-config/flow-config.component';
import { FpsSettingsComponent } from './fps-settings/fps-settings.component';
import { FlowServiceComponent } from './flow-service/flow-service.component';
import { PaymentResponseComponent } from './payment-response/payment-response.component';
import { AdditionalDataComponent } from './additional-data/additional-data.component';
import { ResponseComponent } from './response/response.component';

@NgModule({
    declarations: [
        AmountFormatComponent,
        AmountsDisplayComponent,
        BasketComponent,
        CreditCardComponent,
        CustomerDisplayComponent,
        FlowConfigComponent,
        FpsSettingsComponent,
        FlowServiceComponent,
        PaymentResponseComponent,
        AdditionalDataComponent,
        ResponseComponent
    ],
    imports: [
        CommonModule, RouterModule
    ],
    exports: [
        AmountFormatComponent,
        AmountsDisplayComponent,
        BasketComponent,
        CreditCardComponent,
        CustomerDisplayComponent,
        FlowConfigComponent,
        FpsSettingsComponent,
        FlowServiceComponent,
        PaymentResponseComponent,
        AdditionalDataComponent
    ]
})
export class ComponentsModule {
}
