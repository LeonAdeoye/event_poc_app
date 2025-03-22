export const stateTrackerMiddleware = (pubSubManager) => {
    return store => {
        // Set up the action callback to handle incoming messages
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
            // Only publish state changes for actions that came from AMPS
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
            return next(action); // For non-AMPS actions, just pass them through without publishing
        };
    };
}; 
