import {createFormReducer} from 'redux-form';
import {routerStateReducer} from 'redux-react-router';

export const router = routerStateReducer;
export info from './info';
export widgets from './widgets';
export auth from './auth';
export counter from './counter';
export const survey = createFormReducer('survey', ['name', 'email', 'occupation']);
