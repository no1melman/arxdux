import { merge } from 'rxjs';
import { filter, publish, withLatestFrom } from 'rxjs/operators';

export const ofType = (...types) => source =>
    source.pipe(filter(({ type }) => !!~types.indexOf(type)));

export const combineWithState = state$ => source =>
    source.pipe(
        withLatestFrom(state$, (action, state) => ({
            action,
            state
        }))
    );

export const combinePipes = (...pipes) => source =>
    source.pipe(
        publish(multicasted$ =>
            merge.apply(source, pipes.map(p => p(multicasted$)))
        )
    );

export const combineTopics = (...topics) => state$ => action$ =>
    merge.apply(action$, topics.map(topic => topic(action$, state$)));
