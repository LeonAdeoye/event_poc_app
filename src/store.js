import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import orderDialogReducer from './orderDialogSlice.js';
import {createLogger} from 'redux-logger';
import {stateTrackerMiddleware} from "./stateTrackerMiddleware";

const logger = createLogger();

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        orderDialog: orderDialogReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(logger)
        .concat(stateTrackerMiddleware())
});

export default store;

