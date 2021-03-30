import { gql } from "@apollo/client";

export const GET_ACCOUNT = gql`
  query($accountNumber: String!) {
    getAccount(accountNumber: $accountNumber) {
      accountId
      accountNumber
      accountLabel
      overdueBalance {
        value
        currency
      }
    }
  }
`;
