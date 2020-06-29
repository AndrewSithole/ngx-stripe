import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

import * as StripeJS from '../interfaces/stripejs.interface';
import { StripeServiceInterface } from '../interfaces/stripe-instance.interface';

import { WindowRef } from './window-ref.service';
import { LazyStripeAPILoader, Status } from './api-loader.service';

export class StripeInstance implements StripeServiceInterface {
  private stripe$ = new BehaviorSubject<StripeJS.Stripe | undefined>(undefined);

  get stripe(): Observable<StripeJS.Stripe> {
    return this.stripe$
      .asObservable()
      .pipe(filter((stripe) => Boolean(stripe)));
  }

  constructor(
    private loader: LazyStripeAPILoader,
    private window: WindowRef,
    private key: string,
    private options?: StripeJS.StripeConstructorOptions
  ) {
    this.loader
      .asStream()
      .pipe(
        filter((status: Status) => status.loaded === true),
        first(),
        map(() => (this.window.getNativeWindow() as any).Stripe)
      )
      .subscribe((stripeInstance: any) => {
        const stripe = this.options
          ? (stripeInstance(this.key, this.options) as StripeJS.Stripe)
          : (stripeInstance(this.key) as StripeJS.Stripe);

        this.stripe$.next(stripe);
      });
  }

  getInstance(): StripeJS.Stripe | undefined {
    return this.stripe$.getValue();
  }

  elements(
    options?: StripeJS.StripeElementsOptions
  ): Observable<StripeJS.StripeElements> {
    return this.stripe$.asObservable().pipe(
      filter((stripe) => Boolean(stripe)),
      map((stripe) => stripe.elements(options)),
      first()
    );
  }

  redirectToCheckout(
    options?: StripeJS.RedirectToCheckoutOptions
  ): Observable<never | { error: StripeJS.StripeError }> {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.redirectToCheckout(options))),
      first()
    );
  }

  confirmAuBecsDebitPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmAuBecsDebitPaymentData
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmAuBecsDebitPayment(clientSecret, data))
      ),
      first()
    );
  }

  confirmBancontactPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmBancontactPaymentData,
    options?: StripeJS.ConfirmBancontactPaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmBancontactPayment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmCardPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmCardPaymentData,
    options?: StripeJS.ConfirmCardPaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmCardPayment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmEpsPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmEpsPaymentData,
    options?: StripeJS.ConfirmEpsPaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmEpsPayment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmFpxPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmFpxPaymentData,
    options?: StripeJS.ConfirmFpxPaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmFpxPayment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmGiropayPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmGiropayPaymentData,
    options?: StripeJS.ConfirmGiropayPaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmGiropayPayment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmIdealPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmIdealPaymentData,
    options?: StripeJS.ConfirmIdealPaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmIdealPayment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmP24Payment(
    clientSecret: string,
    data?: StripeJS.ConfirmP24PaymentData,
    options?: StripeJS.ConfirmP24PaymentOptions
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmP24Payment(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmSepaDebitPayment(
    clientSecret: string,
    data?: StripeJS.ConfirmSepaDebitPaymentData
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmSepaDebitPayment(clientSecret, data))
      ),
      first()
    );
  }

  handleCardAction(
    clientSecret: string
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.handleCardAction(clientSecret))),
      first()
    );
  }

  createPaymentMethod(
    paymentMethodData: StripeJS.CreatePaymentMethodData
  ): Observable<{
    paymentMethod?: StripeJS.PaymentMethod;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.createPaymentMethod(paymentMethodData))
      ),
      first()
    );
  }

  retrievePaymentIntent(
    clientSecret: string
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.retrievePaymentIntent(clientSecret))),
      first()
    );
  }

  confirmAuBecsDebitSetup(
    clientSecret: string,
    data?: StripeJS.ConfirmAuBecsDebitSetupData
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmAuBecsDebitSetup(clientSecret, data))
      ),
      first()
    );
  }

  confirmCardSetup(
    clientSecret: string,
    data?: StripeJS.ConfirmCardSetupData,
    options?: StripeJS.ConfirmCardSetupOptions
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmCardSetup(clientSecret, data, options))
      ),
      first()
    );
  }

  confirmSepaDebitSetup(
    clientSecret: string,
    data?: StripeJS.ConfirmSepaDebitSetupData
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from(stripe.confirmSepaDebitSetup(clientSecret, data))
      ),
      first()
    );
  }

  retrieveSetupIntent(
    clientSecret: string
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.confirmSepaDebitSetup(clientSecret))),
      first()
    );
  }

  paymentRequest(
    options: StripeJS.PaymentRequestOptions
  ): StripeJS.PaymentRequest | undefined {
    const stripe = this.getInstance();

    return stripe ? stripe.paymentRequest(options) : undefined;
  }

  createToken(
    tokenType: StripeJS.StripeIbanElement,
    data: StripeJS.CreateTokenIbanData
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(
    tokenType: StripeJS.StripeCardElement | StripeJS.StripeCardNumberElement,
    data?: StripeJS.CreateTokenCardData
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(
    tokenType: 'pii',
    data: StripeJS.CreateTokenPiiData
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(
    tokenType: 'bank_account',
    data: StripeJS.CreateTokenBankAccountData
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(
    tokenType: 'cvc_update',
    element?: StripeJS.StripeCardCvcElement
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(
    tokenType: 'account',
    data: StripeJS.TokenCreateParams.Account
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(
    tokenType: 'person',
    data: StripeJS.TokenCreateParams.Person
  ): Observable<{ token?: StripeJS.Token; error?: StripeJS.StripeError }>;
  createToken(tokenType, data) {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.createToken(tokenType, data))),
      first()
    );
  }

  createSource(
    element: StripeJS.StripeElement,
    sourceData: StripeJS.CreateSourceData
  ): Observable<{ source?: StripeJS.Source; error?: StripeJS.StripeError }>;
  createSource(
    sourceData: StripeJS.CreateSourceData
  ): Observable<{ source?: StripeJS.Source; error?: StripeJS.StripeError }>;
  createSource(
    a,
    b?
  ): Observable<{ source?: StripeJS.Source; error?: StripeJS.StripeError }> {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.createSource(a, b))),
      first()
    );
  }

  retrieveSource(
    source: StripeJS.RetrieveSourceParam
  ): Observable<{ source?: StripeJS.Source; error?: StripeJS.StripeError }> {
    return this.stripe.pipe(
      switchMap((stripe) => from(stripe.retrieveSource(source))),
      first()
    );
  }

  /**
   * @deprecated
   */
  handleCardPayment(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from((stripe as any).handleCardPayment(clientSecret, element, data))
      ),
      first()
    );
  }

  /**
   * @deprecated
   */
  confirmPaymentIntent(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    paymentIntent?: StripeJS.PaymentIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from((stripe as any).confirmPaymentIntent(clientSecret, element, data))
      ),
      first()
    );
  }

  /**
   * @deprecated
   */
  handleCardSetup(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from((stripe as any).handleCardSetup(clientSecret, element, data))
      ),
      first()
    );
  }

  /**
   * @deprecated
   */
  confirmSetupIntent(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from((stripe as any).confirmSetupIntent(clientSecret, element, data))
      ),
      first()
    );
  }

  /**
   * @deprecated
   */
  handleFpxPayment(
    clientSecret: string,
    element?,
    data?
  ): Observable<{
    setupIntent?: StripeJS.SetupIntent;
    error?: StripeJS.StripeError;
  }> {
    return this.stripe.pipe(
      switchMap((stripe) =>
        from((stripe as any).handleFpxPayment(clientSecret, element, data))
      ),
      first()
    );
  }
}
