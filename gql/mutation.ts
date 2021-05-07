import { gql } from "@apollo/client";

export const MAKE_PAYMENT = gql`
  mutation(
    $accountReference: String!
    $accountId: String!
    $externalPaymentToken: String!
    $clientFingerprint: String!
    $redirectUrl: String!
    $correlationId: String!
    $ip: String!
    $amount: AmountInput!
  ) {
    makePayment(
      accountReference: $accountReference
      accountId: $accountId
      externalPaymentToken: $externalPaymentToken
      clientFingerprint: $clientFingerprint
      redirectUrl: $redirectUrl
      correlationId: $correlationId
      ip: $ip
      amount: $amount
    ) {
      success
      failureCode
      requiredAction {
        externalTransactionToken
        transactionData
      }
      paymentMethod {
        paymentMethodToken
      }
    }
  }
`;

export const CONTINUE_3DS_PAYMENT = gql`
  mutation(
    $externalTransactionToken: String!
    $correlationId: String!
    $accountReference: String!
    $accountId: String!
    $amount: AmountInput!
    $continue: Boolean!
  ) {
    continueChallengedPayment(
      externalTransactionToken: $externalTransactionToken
      correlationId: $correlationId
      accountReference: $accountReference
      accountId: $accountId
      amount: $amount
      continue: $continue
    ) {
      success
      failureCode
      internalTransactionToken
      paymentMethod {
        paymentMethodToken
      }
    }
  }
`;
