import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import orderDialogReducer from './orderDialogSlice.js';
import {createLogger} from 'redux-logger';
import {stateTrackerMiddleware} from "./stateTrackerMiddleware";
import { PubSubManager } from "./PubSubManager";

const logger = createLogger();

const initializePubSubManager = (instanceName, connectionString, inboundTopic, outboundTopic) => {
    const pubSubManager = new PubSubManager(instanceName, connectionString, inboundTopic, outboundTopic);
    pubSubManager.connect();
    return pubSubManager;
}

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        orderDialog: orderDialogReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(logger)
        .concat(stateTrackerMiddleware(initializePubSubManager("action-event-responder", "ws://localhost:9008/amps/json", "action-event-request", "action-event-response"))),
});

export default store;
