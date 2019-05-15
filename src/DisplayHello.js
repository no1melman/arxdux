import React from 'react';

import { bindActionCreators, useRedux } from './Provider';
import { sayHello } from './displayRedux';

const mapStateToProps = state => ({ title: state.display.say });
const mapDispatchToActionProps = dispatch =>
    bindActionCreators({ say: sayHello }, dispatch);

const DisplayHello = () => {
    const [{ title }, { say }] = useRedux(mapStateToProps, mapDispatchToActionProps);

    const handleClick = e => {
        e.preventDefault();
        say('Hello');
    };

    return (
        <div>
            <h1>{title}</h1>
            <button onClick={handleClick}>SAY</button>
        </div>
    );
};

export default DisplayHello;
