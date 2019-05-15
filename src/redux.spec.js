import { combineReducers, bindActionCreators } from './Provider';

describe('Given a small state', () => {
    describe('When combining reducers', () => {
        it('should result in state that has passed through all reducers', () => {
            const callumReducer = (state = {}, action) => {
                if (action.type === 'CALLUM') {
                    return {
                        ...state,
                        name: 'Callum'
                    };
                }

                return state;
            };

            const finalReducer = combineReducers({
                callum: callumReducer
            });

            const result = finalReducer({ type: 'CALLUM' });

            expect(Object.keys(result).length).toBe(1);
            expect(result).toStrictEqual({
                callum: {
                    name: 'Callum'
                }
            });
        });
    });
});

describe('Given an action', () => {
    describe('When passing to bindActionCreators', () => {
        it('should wrap the action with dispatch', () => {
            const DISPATCH_TEST = 'DISPATCH_TEST';
            const action = () => ({ type: DISPATCH_TEST });

            let dispatchCalled = false;

            const dispatch = action => {
                dispatchCalled = true;
                return action;
            };

            const boundActionCreators = bindActionCreators(
                { action },
                dispatch
            );

            console.log(boundActionCreators);
            expect(boundActionCreators.action).toBeTruthy();

            const actionValue = boundActionCreators.action();
            expect(dispatchCalled).toBe(true);
            expect(actionValue.type).toBe(DISPATCH_TEST);
        });
    });
});
