import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-32335417-3');
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}
