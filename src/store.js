import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import orderDialogReducer from './orderDialogSlice';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        orderDialog: orderDialogReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export default store;
