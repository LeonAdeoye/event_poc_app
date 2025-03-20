const stateTrackerMiddleware = (store, pubSubManager) => next => action => {
    //const prevState = store.getState();
    //const result = next(action);
    //const nextState = store.getState();

    pubSubManager.publish({
        action
    });

    return result;
};

export { stateTrackerMiddleware };
