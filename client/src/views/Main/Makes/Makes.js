import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MakeTable from './MakeTable.jsx';
import AddMake from './AddMake.jsx';
import EditMake from './EditMake.jsx';

class Makes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/make/add" component={AddMake} />
        <Route path="/make/edit/:id" component={EditMake} />
        <Route path="/make" component={MakeTable} />
      </Switch>
    );
  }
}

export default Makes;
