import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export let getAllCategory = createAsyncThunk('category/getAllCategory', async () => {

    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

    return data.data
})
let categorySLice = createSlice({
    initialState: { categoryList: [] },
    name: "category",
    extraReducers: (build) => {
        build.addCase(getAllCategory.fulfilled, (state, action) => {
            state.categoryList = action.payload

        })
    }
})


export default categorySLice.reducer
