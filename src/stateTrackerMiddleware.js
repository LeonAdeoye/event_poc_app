const stateTrackerMiddleware = (pubSubManager) => (store) => (next) => (action) => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    pubSubManager.publish({
        prevState,
        action,
        nextState
    });

    return result;
};

export { stateTrackerMiddleware };
