import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import anomaliesReducer from './anomalieSlice';
import compteursReducer from './compteurSlice';

export const store = configureStore({
    reducer : {
        user : userReducer,
        anomalies : anomaliesReducer,
        compteurs : compteursReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      })
});
