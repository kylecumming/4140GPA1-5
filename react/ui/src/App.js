import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePOsList from './HomePOsList/HomePOsList'
import Login from './Login/Login'
import SearchPO from './SearchPO/SearchPO'
import PODetails from './PODetails/PODetails'
import CreatePO from './CreatePO/CreatePO'
import PartsList from './PartsList/PartsList'


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={HomePOsList} />
          <Route exact path='/searchPO' component={SearchPO} />
          <Route exact path='/PODetails' component={PODetails} />
          <Route exact path='/createPO' component={CreatePO} />
          <Route exact path='/partsList' component={PartsList} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
