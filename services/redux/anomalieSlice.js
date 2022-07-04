import { createSlice } from "@reduxjs/toolkit";

export const anomalieSlice = createSlice({
    name:'anomalie',
    initialState:{
        anomalies:null,
        designationAnomalie:null,
    },
    reducers:{
        setAnomalies:(state,{payload}) => {
            state.anomalies = payload;
        },
        setDesignationAnomalies:(state,{payload}) => {
            state.designationAnomalie = payload;
        }
    }
});

export const { setAnomalies ,setDesignationAnomalies } = anomalieSlice.actions;
export default anomalieSlice.reducer;