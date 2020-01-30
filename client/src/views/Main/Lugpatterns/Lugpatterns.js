import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import LugpatternTable from './LugpatternTable.jsx';
import AddLugpattern from './AddLugpattern.jsx';
import EditLugpattern from './EditLugpattern.jsx';

class Lugpatterns extends Component {
  render() {
    return (
      <Switch>
        <Route path="/lugpattern/add" component={AddLugpattern} />
        <Route path="/lugpattern/edit/:id" component={EditLugpattern} />
        <Route path="/lugpattern" component={LugpatternTable} />
      </Switch>
    );
  }
}

export default Lugpatterns;
