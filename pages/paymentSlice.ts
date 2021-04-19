import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreditCardType } from "cleave.js/options/creditCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface PaymentSliceState {
  accountNumber: string | null;
  accountId: string | null;
  cardType: CreditCardType | null;
  overdueBalance: number | null;
  paymentAmount: number | null;
  lastFourDigits: string | null;
  externalPaymentToken: string | null;
  ip: string | null;
}

const initialState: PaymentSliceState = {
  accountNumber: null,
  accountId: null,
  cardType: null,
  overdueBalance: null,
  paymentAmount: null,
  lastFourDigits: null,
  externalPaymentToken: null,
  ip: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateAccountNumber: (state, action: PayloadAction<string | null>) => {
      state.accountNumber = action.payload;
    },
    updateAccountId: (state, action: PayloadAction<string | null>) => {
      state.accountId = action.payload;
    },
    updateCardType: (state, action: PayloadAction<CreditCardType | null>) => {
      state.cardType = action.payload;
    },
    updateOverdueBalance: (state, action: PayloadAction<number | null>) => {
      state.overdueBalance = action.payload;
    },
    updatePaymentAmount: (state, action: PayloadAction<number | null>) => {
      state.paymentAmount = action.payload;
    },
    updateLastFourDigits: (state, action: PayloadAction<string | null>) => {
      state.lastFourDigits = action.payload;
    },
    updateExternalPaymentToken: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.externalPaymentToken = action.payload;
    },
    updateIp: (state, action: PayloadAction<string | null>) => {
      state.ip = action.payload;
    },
  },
});

export const {
  updateAccountNumber,
  updateAccountId,
  updateCardType,
  updateOverdueBalance,
  updatePaymentAmount,
  updateLastFourDigits,
  updateExternalPaymentToken,
  updateIp,
} = paymentSlice.actions;

export const usePayment = () => {
  const accountNumber = useSelector<RootState, string>(
    (state) => state.payment.accountNumber
  );

  const accountId = useSelector<RootState, string>(
    (state) => state.payment.accountId
  );

  const cardType = useSelector<RootState, CreditCardType>(
    (state) => state.payment.cardType
  );

  const overdueBalance = useSelector<RootState, number>(
    (state) => state.payment.overdueBalance
  );

  const paymentAmount = useSelector<RootState, number>(
    (state) => state.payment.paymentAmount
  );

  const lastFourDigits = useSelector<RootState, string>(
    (state) => state.payment.lastFourDigits
  );

  const externalPaymentToken = useSelector<RootState, string>(
    (state) => state.payment.externalPaymentToken
  );

  const ip = useSelector<RootState, string>((state) => state.payment.ip);

  return {
    accountNumber,
    accountId,
    cardType,
    overdueBalance,
    paymentAmount,
    lastFourDigits,
    externalPaymentToken,
    ip,
  };
};

export default paymentSlice.reducer;
