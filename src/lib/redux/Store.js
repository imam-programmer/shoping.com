
import { configureStore } from "@reduxjs/toolkit";
import Allproduct from "./AllproductSlice";
import AddtoCartReducer from './AddtoCartSlice'

export const store =configureStore({
  reducer: {
    products: Allproduct,
    cart:AddtoCartReducer
  },
});
