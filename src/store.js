import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import orderDialogReducer from './orderDialogSlice.js';
import {createLogger} from 'redux-logger';
import {stateTrackerMiddleware} from "./stateTrackerMiddleware";
import { PubSubManager } from "./PubSubManager";
import {configs} from './configs.js';

const logger = createLogger();

const initializePubSubManager = () => {
    const pubSubManager = new PubSubManager(configs.amps.instanceName,
        configs.amps.connectionString, configs.amps.topics.inbound, configs.amps.topics.outbound);

    pubSubManager.connect().then(() => {
        console.log(`Connected to AMPS using instance name: [${pubSubManager.instanceName}] and connection string: [${pubSubManager.connectionString}] and subscribed to [${pubSubManager.inboundTopic}] topic and publishing to [${pubSubManager.outboundTopic}] topic.`);
    });
    return pubSubManager;
};

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        orderDialog: orderDialogReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(logger)
        .concat(stateTrackerMiddleware(initializePubSubManager()))
});

export default store;

