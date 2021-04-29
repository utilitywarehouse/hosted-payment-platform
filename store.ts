import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";
import paymentReducer, { PaymentSliceState } from "./pages/paymentSlice";
import summaryReducer, {
  SummarySliceState,
} from "./pages/summary/summarySlice";

export interface RootState {
  payment: PaymentSliceState;
  summary: SummarySliceState;
}

const rootReducer = combineReducers({
  payment: paymentReducer,
  summary: summaryReducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
