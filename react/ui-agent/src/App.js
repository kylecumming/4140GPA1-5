import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePOsList from './HomePOsList/HomePOsList'
import SearchPO from './SearchPO/SearchPO'
import PODetails from './PODetails/PODetails'
import PartsList from './PartsList/PartsList'
import ClientsList from './ClientsList/ClientsList'


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={HomePOsList} />
          <Route exact path='/searchPO' component={SearchPO} />
          <Route exact path='/PODetails' component={PODetails} />
          <Route exact path='/partsList' component={PartsList} />
          <Route exact path='/clientsList' component={ClientsList} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
