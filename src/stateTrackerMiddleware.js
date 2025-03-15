const stateHistory = [];

const stateTrackerMiddleware = store => next => action => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    stateHistory.push({
        prevState,
        action,
        nextState
    });

    return result;
};

export { stateHistory, stateTrackerMiddleware };
