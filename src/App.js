import './App.css';
import NewsFeed from './components/feed/feed.component'
import SignUp from './components/login/signup'
import testHome from "./components/home/home.component";
import testProfile from "./components/login/profile.component";
import testLogin from "./components/login/login.component";
import testRegister from "./components/login/register.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {React, Component} from 'react';
import {Navbar, Nav, Row, Col, Form, Container} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/home/home.component";
import logo from "./logo_files/dis_logo.png"
import {FormControl} from "@material-ui/core";
import Button from "@material-ui/core/Button";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
      username: '',
    };
  }

  setLoggedIn = (cond) => {
    this.setState("loggedIn", cond);
  }

  setUsername = (username) => {
      this.setState("username", username);
  }

  handleLoginRegLink = (isLoggedIn) => {
    if(this.state.loggedIn===false){
      return(
          <div>
            <Nav.Link className={"navbarLinksRight"} href="/testRegister">Register</Nav.Link>
            <Nav.Link className={"navbarLinksRight"} href="/testLogin">Login</Nav.Link>
          </div>
      );
    }else{
      return(
          <div>
            <Nav.Link className={"navbarLinksRight"} href="/testProfile">Profile</Nav.Link>
          </div>
      );
    }
  }

  render() {
    const isLoggedIn = localStorage.getItem('token');
    //this.setUsername(localStorage.getItem('user').username);
    let loginText;
    if (isLoggedIn) {
      loginText = <h3>Signed in as: <a href="/testProfile"><strong>{this.state.username}</strong></a></h3>;
    } else {
      loginText = '';
    }
    return (
      <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" className={"Navbar"} expand="lg">
          <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
          <Navbar.Brand href="/home" className={"logo"}>DiS
            {/*<img className="photo" src={logo} alt={logo} />*/}
          </Navbar.Brand>
          {/*</Col>*/}
          {/*<Col className="d-md-flex d-block flex-row mx-md-auto mx-0">*/}
            <Nav className="mr-auto navbarLinks">
            {/*<Nav.Link className={"navbarLinksLeft"} href="/home">Home</Nav.Link>*/}
            <Nav.Link className={"navbarLinksLeft"} href="/feed">NewsFeed</Nav.Link>
            <Nav.Link className={"navbarLinksLeft"} href="/forum">Forum</Nav.Link>
          </Nav>
          </Col>
          <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
            <Form className="d-md-flex d-block flex-row mx-md-auto mx-8 searchBar" >
              <Form.Control type="text" placeholder="Search" className="searchBar" />
              {/*<Button variant="outline-info" >Search</Button>*/}
            </Form>
          </Col>
          <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
          <Navbar.Collapse className="justify-content-end navbarLinks" on>
            <Nav.Link className={"navbarLinksRight"} href="/testRegister">Register</Nav.Link>
            <Nav.Link className={"navbarLinksRight"} href="/testLogin">Login</Nav.Link>
            <Navbar.Text>  {loginText}  </Navbar.Text>
          </Navbar.Collapse>
          </Col>

        </Navbar>
        {/*<div className="auth-wrapper">*/}
        {/*<div className="auth-inner">*/}
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/testHome" component={testHome} />
            <Route path="/testLogin" component={testLogin} />
            <Route path="/testRegister" component={testRegister} />
            <Route path="/testProfile" component={testProfile} />
            <Route path="/feed" component={NewsFeed} />
          </Switch>
        </div>
        {/*</div>*/}
        {/*</div>*/}
        </Router> 
    );
  }



}

export default App;
