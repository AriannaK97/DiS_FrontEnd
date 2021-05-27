import './App.css';
import NewsFeed from './components/feed/feed.component'
import testHome from "./components/home/home.component";
import testProfile from "./components/login/profile.component";
import testLogin from "./components/login/login.component";
import testRegister from "./components/login/register.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {React, Component} from 'react';
import {Navbar, Nav, Col, Form} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/home/home.component";
import Button from "@material-ui/core/Button";
import AuthService from "./services/auth.service"
import logout from "./components/login/logout.component"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: false,
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

  onLogOut = () => {
      AuthService.logout();
      //Todo redirect
      this.props.history.push("/testLogin")
      //return (<Redirect  to="/testLogin" />);
  }

  render() {
    //const isLoggedIn = localStorage.getItem('token');

    if(AuthService.getCurrentUser() == null){
        return (
            <Router>
                <div className="App">
                    <Navbar bg="dark" variant="dark" className={"Navbar"} expand="lg">
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Navbar.Brand href="/home" className={"logo"}>DiS</Navbar.Brand>
                            <Nav className="mr-auto navbarLinks"/>
                        </Col>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0"/>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Navbar.Collapse className="justify-content-end navbarLinks" on>
                                <Nav.Link className={"navbarLinksRight"} href="/testRegister">Register</Nav.Link>
                                <Nav.Link className={"navbarLinksRight"} href="/testLogin">Login</Nav.Link>
                            </Navbar.Collapse>
                        </Col>

                    </Navbar>

                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/testHome" component={testHome} />
                        <Route path="/testLogin" component={testLogin} />
                        <Route path="/testRegister" component={testRegister} />
                        <Route path="/testProfile" component={testProfile} />
                        <Route path="/feed" component={NewsFeed} />
                    </Switch>
                </div>
            </Router>
        );
    }else{
        return (
            <Router>
                <div className="App">
                    <Navbar bg="dark" variant="dark" className={"Navbar"} expand="lg">
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Navbar.Brand href="/home" className={"logo"}>DiS</Navbar.Brand>
                            <Nav className="mr-auto navbarLinks">
                                <Nav.Link className={"navbarLinksLeft"} href="/feed">NewsFeed</Nav.Link>
                                <Nav.Link className={"navbarLinksLeft"} href="/forum">Forum</Nav.Link>
                            </Nav>
                        </Col>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Form className="d-md-flex d-block flex-row mx-md-auto mx-8 searchBar" >
                                <Form.Control type="text" placeholder="Search" className="searchBar" />
                            </Form>
                        </Col>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Navbar.Collapse className="justify-content-end navbarLinks" on>
                                <Nav.Link className={"navbarLinksRight"} href="/testProfile">Messages</Nav.Link>
                                <Nav.Link className={"navbarLinksRight"} href="/testProfile">Profile</Nav.Link>
                                <Button className={"navbarLinksRight navbar-btn"} onClick={logout}>Log Out</Button>
                            </Navbar.Collapse>
                        </Col>

                    </Navbar>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/testHome" component={testHome} />
                        <Route path="/testLogin" component={testLogin} />
                        <Route path="/testRegister" component={testRegister} />
                        <Route path="/testProfile" component={testProfile} />
                        <Route path="/feed" component={NewsFeed} />
                    </Switch>
                </div>
            </Router>
        );
    }
  }

}

export default App;
