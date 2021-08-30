import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';

import App from './App';
import Theme from './Theme';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>
    z
  </React.StrictMode>,
  document.getElementById('root')
);
