/* global __DEVELOPMENT__, __DEVTOOLS__ */
import React, {Component} from 'react';
import Router from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './views/routes';
import ApiClient from './ApiClient';
import createMiddleware from './redux/clientMiddleware';
import * as reducers from './reducers/index';

const reducer = combineReducers(reducers);
const history = new BrowserHistory();
//const client = new ApiClient();

//const middleware = createMiddleware(client);
//const finalCreateStore = applyMiddleware(middleware)(createStore);
//const store = finalCreateStore(reducer, window.__data);
const store = createStore(reducer, window.__data);

export default class ClientApp extends Component {
  render() {
    return (<Provider store={store}>
      {() => <Router history={history} children={routes}/>}
    </Provider>);
  }
}

