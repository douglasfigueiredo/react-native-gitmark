import React from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';

import 'config/ReactotronConfig';
import store from 'store';

export default () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);
