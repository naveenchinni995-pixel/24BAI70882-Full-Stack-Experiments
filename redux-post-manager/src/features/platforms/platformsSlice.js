import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    platforms: [

        {
            id:1,
            name:"Instagram"
        },

        {
            id:2,
            name:"Facebook"
        },

        {
            id:3,
            name:"LinkedIn"
        }

    ]

};

const platformsSlice = createSlice({

    name:"platforms",

    initialState,

    reducers:{}

});

export default platformsSlice.reducer;