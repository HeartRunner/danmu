import {createFormReducer} from 'redux-form';
export info from './info';
export widgets from './widgets';
export auth from './auth';
export counter from './counter';
export room from './room';
export const survey = createFormReducer('survey', ['name', 'email', 'occupation']);
export const create = createFormReducer('create', ['url']);
