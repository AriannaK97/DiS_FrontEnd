import './App.css';
import Home from './components/home/home'
import Login from './components/login/login'
import SignUp from './components/login/signup'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {React, Component} from 'react';
//import API from './utils/API';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      username: '',
    };
  }

  setLogedIn = (cond) => {
    this.setState("loggedIn", cond);
  }

  setUsername = (username) => {
      this.setState("username", username);
  }

  render() {
    return (
      <Router>
      <div className="App">

      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>DiS</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
        </div>
        </div>
        </Router> 
    );
  }
}

export default App;
