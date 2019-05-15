export const sayHello = payload => ({ type: 'HELLO', payload });

export const displayReducer = (state = { say: 'Random' }, action) => {
    if (action.type === 'HELLO') {
        return {
            ...state,
            say: action.payload
        };
    }

    return state;
};
