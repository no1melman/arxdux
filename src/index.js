import React from 'react';
import { render } from 'react-dom';

import App from './App';

import Provider from './arxdux/Provider';

import store from './rootReducer';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
