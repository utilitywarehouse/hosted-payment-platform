import { gql } from "@apollo/client";

export const MAKE_PAYMENT = gql`
    mutation(
        accountReference: String!,
        accountId: String!,
        externalPaymentToken: String!,
        clientFingerprint: String!,
        redirectUrl: String!,
        correlationId: String!,
        ip: String!,
        amount: AmountInput!
    ) {
        makePayment(
            accountReference: $accountReference,
            accountId: $accountId,
            externalPaymentToken: $externalPaymentToken,
            clientFingerprint: $clientFingerprint,
            redirectUrl: $redirectUrl,
            correlationId: $correlationId,
            ip: $ip,
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
