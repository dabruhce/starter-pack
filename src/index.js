import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from './app/App';
import configureStore from './configureStore';

const history = createHistory();
const store = configureStore(history);

import {red500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: red500,
  },
});

ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
  <Provider store={store}>
    <App history={history} />
  </Provider>
</MuiThemeProvider>,
  document.getElementById('root')
);
