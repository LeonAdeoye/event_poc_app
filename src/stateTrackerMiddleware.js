export const stateTrackerMiddleware = (pubSubManager) => {
    return store => {
        // Set up the action callback to handle incoming messages
        pubSubManager.setActionCallback((actions) => {
            actions.forEach(action => {
                store.dispatch({
                    type: action.action,
                    payload: action.payload
                });
            });
        });

        return next => async action => {

            const prevState = store.getState();
            const result = next(action);
            const nextState = store.getState();

            await pubSubManager.publish({
                previousState: prevState,
                action: action,
                nextState: nextState
            });

            return result;
        };
    };
}; 
