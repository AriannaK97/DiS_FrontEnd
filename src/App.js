import './App.css';
import NewsFeed from './components/feed/feed.component'
import testHome from "./components/home/home.component";
import testProfile from "./components/login/profile.component";
import testLogin from "./components/login/login.component";
import testRegister from "./components/login/register.component";
import Forum from "./components/forum/forum.component"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {React, Component} from 'react';
import {Navbar, Nav, Col, Form} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/home/home.component";
import Button from "@material-ui/core/Button";
import AuthService from "./services/auth.service"
import LogOut from "./components/login/logout.component"
import Divider from "@material-ui/core/Divider";
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core";
import Messenger from "./components/chat/messenger.component"


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

    forceAppUpdate() {
        this.forceUpdate();
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
                            <div className={"searchIcon"}>
                                <SearchIcon />
                            </div>
                        </Col>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Navbar.Collapse className="justify-content-end navbarLinks" on>
                                <Nav.Link className={"navbarLinksRight"} href="/messenger">Messages</Nav.Link>
                                <Nav.Link className={"navbarLinksRight"} href="/testProfile">Profile</Nav.Link>
                                <Divider orientation="vertical" style={{backgroundColor:"whitesmoke"}} flexItem />
                                <Nav.Link className={"navbarLinksRight navbar-btn"} href="/logout">Log Out</Nav.Link>
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
                        <Route path="/forum" component={Forum} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/messenger" component={Messenger} />
                    </Switch>
                </div>
            </Router>
        );
    }
  }

}

export default App;
