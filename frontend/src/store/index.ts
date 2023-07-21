import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import chatReducer from "./chatSlice"
import productReducer from "./productReducer"

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    product: productReducer
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