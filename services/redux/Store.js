import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import anomaliesReducer from './anomalieSlice';
import compteursReducer from './compteurSlice';
import rueSecteurReducer from './rueSecteurSlice';

export const store = configureStore({
    reducer : {
        user : userReducer,
        anomalies : anomaliesReducer,
        compteurs : compteursReducer,
        rueSecteurs : rueSecteurReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      })
});
