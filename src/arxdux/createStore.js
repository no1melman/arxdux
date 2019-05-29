import { Subject } from 'rxjs';

import { startWith, scan, shareReplay } from 'rxjs/operators';

export default function createStore(topic, initialState = {}) {
    const actionSubject$ = new Subject();
    const stateSubject$ = new Subject();

    const state$ = stateSubject$.pipe(
        startWith(initialState),
        scan((state, command) => ({ ...state, ...command })),
        shareReplay(1)
    );

    const pipedTopics$ = actionSubject$.pipe(topic(state$));
    pipedTopics$.subscribe(stateSubject$.next);
    const dispatch = action => actionSubject$.next(action);

    return [dispatch, state$, initialState];
}
