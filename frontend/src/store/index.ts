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