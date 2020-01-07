import { Observable, BehaviorSubject, of, NEVER } from 'rxjs';
import { PaymentApi, PaymentClient, Payment, PaymentResponse, ResponseQuery, FlowEvent, Device, PaymentSettings, Request, Response } from 'appflow-payment-initiation-api';

export class PaymentApiCordova implements PaymentApi {
    private static instance: PaymentApiCordova;

    private paymentClient = new PaymentClientCordova();

    public static getInstance(): PaymentApi {
        if (!PaymentApiCordova.instance) {
            PaymentApiCordova.instance = new PaymentApiCordova();
        }

        return PaymentApiCordova.instance;
    }

    private constructor() { }

        /**
     * Get the API version.
     *
     * The API versioning follows semver rules with major.minor.patch versions.
     *
     * @return The API version
     */
    public getApiVersion(): Observable<string> {
        return of("1.2.3");
    }

    /**
     * Returns true if the processing service that handles API requests is installed.
     *
     * If not installed, none of the API calls will function.
     *
     * @return True if API processing service is installed, false otherwise
     */
    public isProcessingServiceInstalled(): Observable<boolean> {
        return of(true);
    }

    /**
     * Get the processing service version installed on this device.
     *
     * @return The processing service version (semver format)
     */
    public getProcessingServiceVersion(): Observable<string> {
        return of("fjkj");
    }

    /**
     * Get a new instance of a {@link PaymentClient} to initiate payments.
     *
     * @return An instance of {@link PaymentClient}
     */
    public getPaymentClient(): PaymentClient {
        return this.paymentClient;
    }
}

export class PaymentClientCordova implements PaymentClient{
    getPaymentSettings(): Observable<PaymentSettings> {
        return NEVER;
    }    
    initiateRequest(request: Request): Promise<void> {
        throw new Error("Method not implemented.");
    }
    initiatePayment(payment: Payment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    queryPaymentResponses(responseQuery: ResponseQuery): Observable<PaymentResponse> {
        return NEVER;
    }
    queryResponses(responseQuery: ResponseQuery): Observable<Response> {
        return NEVER;
    }
    getDevices(): Observable<Device[]> {
        return NEVER;
    }
    subscribeToSystemEvents(): Observable<FlowEvent> {
        return NEVER;
    }
    subscribeToPaymentResponses(): Observable<PaymentResponse> {
        return NEVER;
    }
    subscribeToResponses(): Observable<Response> {
        return NEVER;
    }


}
