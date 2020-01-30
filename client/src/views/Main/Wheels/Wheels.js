import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import WheelTable from './WheelTable.jsx';
import AddWheel from './AddWheel.jsx';
import EditWheel from './EditWheel.jsx';

class Wheels extends Component {
  render() {
    return (
      <Switch>
        <Route path="/wheel/add" component={AddWheel} />
        <Route path="/wheel/edit/:id" component={EditWheel} />
        <Route path="/wheel" component={WheelTable} />
      </Switch>
    );
  }
}

export default Wheels;
