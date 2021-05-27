import './App.css';
import NewsFeed from './components/feed/feed.component'
import testHome from "./components/home/home.component";
import testProfile from "./components/login/profile.component";
import testLogin from "./components/login/login.component";
import testRegister from "./components/login/register.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {React, Component, useState, useEffect} from 'react';
import {Navbar, Nav, Row, Col, Form, Container} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/home/home.component";
import logo from "./logo_files/dis_logo_transparent.png"
import {FormControl} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
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
                            <Navbar.Brand href="/home" className={"logo"}>DiS
                                {/*<img className="photo" src={logo} alt={logo} />*/}
                            </Navbar.Brand>
                            {/*</Col>*/}
                            {/*<Col className="d-md-flex d-block flex-row mx-md-auto mx-0">*/}
                            <Nav className="mr-auto navbarLinks">
                                {/*<Nav.Link className={"navbarLinksLeft"} href="/home">Home</Nav.Link>*/}
                                {/*<Nav.Link className={"navbarLinksLeft"} href="/feed">NewsFeed</Nav.Link>*/}
                                {/*<Nav.Link className={"navbarLinksLeft"} href="/forum">Forum</Nav.Link>*/}
                            </Nav>
                        </Col>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            {/*{showSearchBar(this.state.loggedIn)}*/}
                            {/*<Form className="d-md-flex d-block flex-row mx-md-auto mx-8 searchBar" >*/}
                            {/*    <Form.Control type="text" placeholder="Search" className="searchBar" />*/}
                            {/*    /!*<Button variant="outline-info" className="searchButton">Search</Button>*!/*/}
                            {/*</Form>*/}
                        </Col>
                        <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                            <Navbar.Collapse className="justify-content-end navbarLinks" on>
                                <Nav.Link className={"navbarLinksRight"} href="/testRegister">Register</Nav.Link>
                                <Nav.Link className={"navbarLinksRight"} href="/testLogin">Login</Nav.Link>
                            </Navbar.Collapse>
                        </Col>

                    </Navbar>
                    {/*<img className="photo" src={logo} alt={logo} />*/}

                    {/*<div className="auth-wrapper">*/}
                    {/*<div className="auth-inner">*/}
                    <Switch>
                        <Route exact path="/home" component={Home} />
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
    }else{
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
                            {/*{showSearchBar(this.state.loggedIn)}*/}
                            <Form className="d-md-flex d-block flex-row mx-md-auto mx-8 searchBar" >
                                <Form.Control type="text" placeholder="Search" className="searchBar" />
                                {/*<Button variant="outline-info" className="searchButton">Search</Button>*/}
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
                    {/*<div className="auth-wrapper">*/}
                    {/*<div className="auth-inner">*/}
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/testHome" component={testHome} />
                        <Route path="/testLogin" component={testLogin} />
                        <Route path="/testRegister" component={testRegister} />
                        <Route path="/testProfile" component={testProfile} />
                        <Route path="/feed" component={NewsFeed} />
                        {/*<Route path="/logOut" component={} />*/}
                    </Switch>
                </div>
                {/*</div>*/}
                {/*</div>*/}
            </Router>
        );
    }
  }

}

export default App;
