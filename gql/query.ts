import { gql } from "@apollo/client";

export const GET_ACCOUNT = gql`
  query($accountNumber: String!) {
    getAccount(accountNumber: $accountNumber) {
      accountId
      accountNumber
      customerFirstName
      customerLastName
      overdueBalance {
        value
        currency
      }
    }
  }
`;
