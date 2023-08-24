import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productReducer from "./basic/productReducer";
import colorReducer from "./basic/colorReducer";
import sizeReducer from "./basic/sizeReducer";
import seasonReducer from "./basic/seasonReducer";
import brandReducer from "./basic/brandReducer";
import itemReducer from "./basic/itemReducer";
import materialReducer from "./basic/materialReducer";
import deliveryReducer from "./basic/deliveryReducer";
import chargerReducer from "./basic/chargerReducer";
import dealerReducer from "./basic/dealerReducer";
import exhibitionReducer from "./basic/exhibitionReducer";
import incomingDepartmentReducer from "./basic/incomingDepartmentReducer";
import originCountryReducer from "./basic/originCountryReducer";
import storehouseReducer from "./basic/storehouseReducer";
import customerReducer from "./basic/customerReducer";
import deposittypeReducer from "./basic/deposittypeReducer";
import entrustReducer from './basic/entrustReducer';
// slip
import orderSlipReducer from "./slip/orderSlipReducer";
import consignmentSlipReducer from "./slip/consignmentSlipReducer";
import depositSlipReducer from "./slip/depositSlipReducer";
import purchaseorderSlipReducer from "./slip/purchaseorderSlipReducer";
import purchaseSlipReducer from "./slip/purchaseSlipReducer";
import collectionSlipReducer from "./slip/collectionSlipReducer";
import paymentSlipReducer from "./slip/paymentSlipReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    color: colorReducer,
    size: sizeReducer,
    season: seasonReducer,
    brand: brandReducer,
    item: itemReducer,
    material: materialReducer,
    delivery: deliveryReducer,
    charger: chargerReducer,
    dealer: dealerReducer,
    exhibition: exhibitionReducer,
    incomingDepartment: incomingDepartmentReducer,
    originCountry: originCountryReducer,
    storehouse: storehouseReducer,
    customer: customerReducer,
    deposittype: deposittypeReducer,
    entrust: entrustReducer,
    //slip
    orderSlip: orderSlipReducer,
    consignmentSlip: consignmentSlipReducer,
    depositSlip: depositSlipReducer,
    purchaseorderSlip: purchaseorderSlipReducer,
    purchaseSlip: purchaseSlipReducer,
    collectionSlip: collectionSlipReducer,
    paymentSlip: paymentSlipReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>