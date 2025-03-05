import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const store = configureStore({
    reducer: {
        orders: ordersReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export default store;
