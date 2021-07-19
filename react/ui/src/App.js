// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// //api call to check and see if react is connected to api
// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={apiResponse: ""};
//   }

//   callAPI(){
//     fetch("http://localhost:3000/api/client/getPartsList17")
//     .then(res => res.text())
//     .then(res => this.setState({apiResponse: res}));
//   }

//   componentWillMount(){
//     this.callAPI();
//   }



// render(){
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />

//       </header>
//       <p>{this.state.apiResponse}</p>
//     </div>
//   );
// }
// }

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePOsList from './HomePOsList/HomePOsList'
import Login from './Login/Login'
import SearchPO from './SearchPO/SearchPO'
import PODetails from './PODetails/PODetails'
// import CreatePO from './CreatePO/CreatePO'


function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={HomePOsList} />
          <Route exact path='/searchPO' component={SearchPO} />
          <Route exact path='/PODetails' component={PODetails} />
          {/* <Route exact path='/createPO' component={CreatePO} /> */}
        </Switch>
      </Router>
    </div>
  );
}


export default App;
