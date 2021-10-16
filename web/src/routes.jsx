import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';

import Layout from './common/Layout';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Feed} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
