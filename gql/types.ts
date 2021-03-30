export interface GetAccountResponseInterface {
  getAccount: GetAccountInterface;
}

export interface GetAccountInterface {
  accountId: string;
  accountNumber: string;
  accountLabel: string;
  overdueBalance: AmountInterface;
}

export interface GetAccountVariablesInterface {
  accountNumber: string;
}

export interface MakePaymentResponseInterface {
  makePayment: MakePaymentInterface;
}

export interface MakePaymentInterface {
  success: boolean;
  failureCode: FailureCodeType;
  requiredAction: RequiredActionInterface;
  paymentMethod: PaymentMethodInterface;
}

export interface MakePaymentVariablesInterface {
  accountReference: string; // e.g. //uw.co.uk/customer/account-number/0000000
  accountId: string;
  externalPaymentToken: string; // Spreedly payment method token
  clientFingerprint: string;
  // The client fingerprint identifies the client device and it's required for ecommerce
  // payments (for 3DS).
  // It's the combination of the client browser size and the accept header from the server
  // side rendered page in a serialized form.
  // Read more: https://docs.spreedly.com/guides/3dsecure2/#spreedly-3ds2-integration
  redirectUrl: string;
  correlationId: string;
  ip: string;
  amount: AmountInterface;
}

export interface AmountInterface {
  value: string;
  currency: string;
}

interface RequiredActionInterface {
  externalTransactionToken: string;
  transactionData: string;
}

interface PaymentMethodInterface {
  paymentMethodToken: string;
}

type FailureCodeType =
  | "FAILURE_NONE"
  | "FAILURE_INVALID_PAYMENT_METHOD"
  | "FAILURE_PAYMENT_METHOD_NOT_ALLOWED"
  | "FAILURE_ADDRESS_CHECK_FAILED"
  | "FAILURE_PAYMENT_REFUSED";
