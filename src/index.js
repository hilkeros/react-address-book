import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Settings from './Components/Settings';

import './index.css';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Provider store={store}>
	  <Router>
	    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
	      <ul className="navbar-nav mr-auto">
	        <li>
	          <NavLink exact className="nav-link" activeClassName="active" to="/">Address Book</NavLink>
	        </li>
	        <li>
	          <NavLink className="nav-link" activeClassName="active" to="/settings">Settings</NavLink>
	        </li>
	      </ul>
	    </nav>
	    <Route exact path="/" component={App} />
	    <Route path="/settings" component={Settings} />
	  </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
