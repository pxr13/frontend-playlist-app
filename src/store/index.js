import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { omit, curry, pipe } from 'ramda';

import reducers from '../reducers';
import { loadState, saveState } from './localStorage.js';
import './session';

const key = 'state';
const stateToOmit = ['form', 'errors', 'player', 'nav'];

const persistedState = loadState(key);

const store = createStore(reducers, persistedState, applyMiddleware(reduxThunk));

const save = curry((key, stateToSave) => {
  saveState(stateToSave, key);
});

const omitState = curry((stateToOmit, currentState) => omit(stateToOmit, currentState));

const getCurrentState = (store) => store.getState();

const initSavedState = pipe(getCurrentState, omitState(stateToOmit), save(key));

store.subscribe(() => {
  initSavedState(store);
});

export default store;
