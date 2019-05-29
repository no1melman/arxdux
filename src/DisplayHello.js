import React from 'react';

import { useDispatch } from './arxdux/hooks';
import { sayHello } from './displayTopic';

const mapStateToProps = state => ({ title: state.display.say });

const DisplayHello = () => {
    const { title } = { title: 'Compile' };
    const dispatch = useDispatch();

    const handleClick = e => {
        e.preventDefault();
        dispatch(sayHello('Hello'));
    };

    return (
        <div>
            <h1>{title}</h1>
            <button onClick={handleClick}>SAY</button>
        </div>
    );
};

export default DisplayHello;
