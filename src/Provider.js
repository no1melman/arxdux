import React, { useContext, useState } from 'react';

export const KashContext = React.createContext();

const wrappedDispatch = (dispatch, action) =>
    function() {
        dispatch(action.apply(this, arguments));
    };

export const bindActionCreators = (actionsObject, dispatch) =>
    Object.keys(actionsObject)
        .map(k => ({ [k]: wrappedDispatch(dispatch, actionsObject[k]) }))
        .reduce((prev, curr) => ({ ...prev, ...curr }), {});

export const useRedux = (mapStateToProps, mapDispatchToProps) => {
    const { store, dispatch } = useContext(KashContext);

    const stateProps = mapStateToProps(store);

    const dispatchProps = mapDispatchToProps(dispatch);

    return [stateProps, dispatchProps];
};

export const combineReducers = reducerObject => {
    const keys = Object.keys(reducerObject);

    return (state, action) =>
        keys
            .map(k => ({
                [k]: reducerObject[k](state[k], action)
            }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), state);
};

const subscribers = [];
const subscribe = sub => subscribers.push(sub);
const publish = () => subscribers.forEach(sub => sub());

export const createStore = (reducer, initialState) => {
    let state = initialState || {};

    const dispatch = action => {
        const newState = reducer(state, action);

        if (newState != state) {
            state = newState;
            publish();
        }
    };

    const getState = () => state;

    dispatch({ type: '@@REDUX_INIT' });

    return [getState, dispatch];
};

const Provider = ({ store, children }) => {
    const [getState, storeDispatch] = store;
    const [internalState, setInternalState] = useState(getState());

    subscribe(() => setInternalState(getState()));

    const dispatch = action => {
        storeDispatch(action);
        setInternalState(getState());
    };

    return (
        <KashContext.Provider value={{ store: internalState, dispatch }}>
            {children}
        </KashContext.Provider>
    );
};

export default Provider;
