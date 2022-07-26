import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0, matricule: '', nom: '', role: '', emailu: '', passwordu: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: initialState,
        tournes: [],
        tourneCourant:""
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            //console.log('action',action)
        },
        logout: (state, action) => {
            state.value = initialState
        },
        setTourne: (state, { payload }) => {
            state.tournes = payload;
        },
        setTourneCourant: (state, { payload }) => {
            state.tourneCourant = payload;
        },
    },
});

export const { login, logout, setTourne,setTourneCourant } = userSlice.actions;
export default userSlice.reducer;