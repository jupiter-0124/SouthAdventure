import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CountryTable from './CountryTable.jsx';
import AddCountry from './AddCountry.jsx';
import EditCountry from './EditCountry.jsx';

class Countries extends Component {
  render() {
    return (
      <Switch>
        <Route path="/country/add" component={AddCountry} />
        <Route path="/country/edit/:id" component={EditCountry} />
        <Route path="/country" component={CountryTable} />
      </Switch>
    );
  }
}

export default Countries;
