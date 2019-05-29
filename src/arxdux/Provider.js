import React, { useContext, useState, useEffect } from 'react';

import { ArxduxContext } from './context';

const Provider = ({ store, children }) => {
    const [dispatch, state$, initialState] = store;
    const [internalState, setInternalState] = useState(initialState);

    useEffect(() => {
        state$.subscribe(setInternalState);
    }, []);

    console.log('component state', internalState);

    return (
        <ArxduxContext.Provider value={{ store: internalState, dispatch }}>
            {children}
        </ArxduxContext.Provider>
    );
};

export default Provider;
