import { createSlice } from "@reduxjs/toolkit";

export const compteurSlice = createSlice({
    name:'compteurs',
    initialState:{
        compteurs:null,
        idCompteur:0,
        isLoding:false,
    },
    reducers:{
        setCompteurs:(state,{payload}) => {
            state.compteurs = payload;
            
            //console.log('action',payload)
        },
        addCompteurs:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(numeroCompteur,idGeographique,nomAbonne,adresse){
                return{
                    payload:{
                        numeroCompteur,idGeographique,nomAbonne,adresse
                    }
                }
            }
        },
        setIdCompteur:(state,{payload}) => {
            state.idCompteur = payload;
        },
        loding:(state) => {
            state.isLoding = true;
        },
        notLoding:(state) => {
            state.isLoding = false;
        }
    }
});

export const { setCompteurs ,setIdCompteur,loding ,notLoding} = compteurSlice.actions;
export default compteurSlice.reducer;