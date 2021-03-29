import { CreditCardType } from "cleave.js/options/creditCard";
import mixpanel, { Callback, RequestOptions } from "mixpanel-browser";

type TrackingEventType =
  | "payments-amount-confirmed"
  | "payments-amount-selected"
  | "payments-contact-us-page-viewed"
  | "payments-failure-page-viewed"
  | "payments-method-confirmed"
  | "payments-not-found-page-viewed"
  | "payments-page-viewed"
  | "payments-payment-submitted"
  | "payments-success-page-viewed"
  | "payments-unknown-outcome-page-viewed"
  | "payments-unknown-page-viewed";

interface TrackingPropertiesInterface {
  account_number: string;
  amount: number;
  card_type: CreditCardType;
  full_amount: boolean;
  overdue_balance: number;
  paid_amount: number;
  location: string;
  required_amount: number;
}

export const useTracking = () => {
  const identify = (accountNumber: string) => {
    mixpanel.identify(accountNumber);
  };

  const trackEvent = (
    eventName: TrackingEventType,
    properties?: Partial<TrackingPropertiesInterface>,
    optionsOrCallback?: RequestOptions | Callback,
    callback?: Callback
  ) => {
    mixpanel.track(eventName, properties, optionsOrCallback, callback);
  };

  return {
    identify,
    trackEvent,
  };
};
