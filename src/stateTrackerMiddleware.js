import {PubSubManager} from "./PubSubManager.js";
import {configs} from "./configs.js";

export const stateTrackerMiddleware = () => {
    return store => {
        const pubSubManager = new PubSubManager(configs.amps.instanceName, configs.amps.connectionString,
            configs.amps.topics.inbound, configs.amps.topics.outbound);

        pubSubManager.connect().then(() => {
            console.log(`Connected to AMPS using instance name: [${pubSubManager.instanceName}] and connection string: [${pubSubManager.connectionString}] and subscribed to [${pubSubManager.inboundTopic}] topic and publishing to [${pubSubManager.outboundTopic}] topic.`);
        });

        pubSubManager.setActionCallback((actions) => {
            actions.forEach(action => {
                store.dispatch({
                    type: action.action,
                    payload: action.payload,
                    // Mark this action as coming from AMPS
                    meta: {
                        fromAMPS: true
                    }
                });
            });
        });

        return next => async action => {
            // Only publish state changes for actions that came from AMPS.
            if (action.meta?.fromAMPS) {
                const prevState = store.getState();
                const result = next(action);
                const nextState = store.getState();

                await pubSubManager.publish({
                    previousState: prevState,
                    action: action,
                    nextState: nextState
                });
                return result;
            }
            return next(action); // For non-AMPS actions, just pass them through without publishing.
        };
    };
}; 
