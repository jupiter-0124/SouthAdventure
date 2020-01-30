import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ColorTable from './ColorTable.jsx';
import AddColor from './AddColor.jsx';
import EditColor from './EditColor.jsx';

class Colors extends Component {
  render() {
    return (
      <Switch>
        <Route path="/color/add" component={AddColor} />
        <Route path="/color/edit/:id" component={EditColor} />
        <Route path="/color" component={ColorTable} />
      </Switch>
    );
  }
}

export default Colors;
