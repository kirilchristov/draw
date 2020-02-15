/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'React with Webpack and Babel, Kiril Boilerplate, Yep';

ReactDOM.render(
  <App title={title} />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);

// Allow hot reload
module.hot.accept();
