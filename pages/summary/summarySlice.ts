import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface SummarySliceState {
  correlationId: string | null;
  accountReference: string | null;
  externalTransactionToken: string | null;
}

const initialState: SummarySliceState = {
  correlationId: null,
  accountReference: null,
  externalTransactionToken: null,
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    updateCorrelationId: (state, action: PayloadAction<string | null>) => {
      state.correlationId = action.payload;
    },
    updateAccountReference: (state, action: PayloadAction<string | null>) => {
      state.accountReference = action.payload;
    },
    updateExternalTransactionToken: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.externalTransactionToken = action.payload;
    },
  },
});

export const {
  updateCorrelationId,
  updateAccountReference,
  updateExternalTransactionToken,
} = summarySlice.actions;

export const useSummary = () => {
  const correlationId = useSelector<RootState, string>(
    (state) => state.summary.correlationId
  );

  const accountReference = useSelector<RootState, string>(
    (state) => state.summary.accountReference
  );

  const externalTransactionToken = useSelector<RootState, string>(
    (state) => state.summary.externalTransactionToken
  );

  return { correlationId, accountReference, externalTransactionToken };
};

export default summarySlice.reducer;
