import { configureStore } from "@reduxjs/toolkit";
import CategorySliceReducer from "./CategorySlice";


export let store = configureStore({

    reducer: {
        categoryData:CategorySliceReducer
    }
})

