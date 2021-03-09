import { CreditCardType } from "cleave.js/options/creditCard";
import mixpanel, { Callback, RequestOptions } from "mixpanel-browser";

type TrackingEventType =
  | "payments-page-viewed"
  | "payments-amount-selected"
  | "payments-amount-confirmed"
  | "payments-method-confirmed"
  | "payments-payment-submitted"
  | "payments-success-page-viewed"
  | "payments-failure-page-viewed"
  | "payments-unknown-outcome-page-viewed"
  | "payments-contact-us-page-viewed";

interface TrackingPropertiesInterface {
  amount: number;
  card_type: CreditCardType;
  full_amount: boolean;
  overdue_balance: number;
  paid_amount: number;
  required_amount: number;
}

export const useTracking = () => {
  const trackEvent = (
    eventName: TrackingEventType,
    properties?: Partial<TrackingPropertiesInterface>,
    optionsOrCallback?: RequestOptions | Callback,
    callback?: Callback
  ) => {
    mixpanel.track(eventName, properties, optionsOrCallback, callback);
  };

  return trackEvent;
};
