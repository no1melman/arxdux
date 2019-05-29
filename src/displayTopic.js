import { pipe } from 'rxjs';
import { ofType, combinePipes } from './arxdux/operators';
import { map, tap } from 'rxjs/operators';

export const sayHello = payload => ({ type: 'HELLO', payload });

const sayPipe = pipe(
    ofType('HELLO'),
    map(({ payload }) => ({ say: payload }))
);

export const topic = (action$, state$) => action$.pipe(combinePipes(sayPipe));
