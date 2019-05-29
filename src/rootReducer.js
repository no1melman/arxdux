import { combineTopics } from './arxdux/operators';
import createStore from './arxdux/createStore';

import { topic as displayTopic } from './displayTopic';

export default createStore(combineTopics(displayTopic));
