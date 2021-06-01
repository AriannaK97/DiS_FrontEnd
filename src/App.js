import './App.css';
import NewsFeed from './components/feed/feed.component'
import Profile from "./components/profile/profile.component";
import Login from "./components/login/login.component";
import Register from "./components/login/register.component";
import Forum from "./components/forum/forum.component"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {React, Component} from 'react';
import {Navbar, Nav, Col, Form} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/home/home.component";
import AuthService from "./services/auth.service"
import LogOut from "./components/login/logout.component"
import Divider from "@material-ui/core/Divider";
import Messenger from "./components/chat/messenger/messenger.component"
import Tetris from "./components/errorPage/tetris"
import SearchBarResultPageComponent from "./components/searchBar/searchBarResultPage.component";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            loggedIn: localStorage.getItem('token') ? true : false,
            username: '',
            showOpeningMessage: true,
            visitedUser:'',
            searchParam: ''
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

    handleSearch(s){
        this.setState({searchParam:s.target.value})
        console.log()
        return(
            <SearchBarResultPageComponent open={true} visitor={this.visitor} searchParam={this.searchParam}/>
        );
    }


    render() {
    //const isLoggedIn = localStorage.getItem('token');
    //     const searchParam = '';

        if(AuthService.getCurrentUser() === null){
            return (
                <Router>
                    <div className="App">
                        <Navbar bg="dark" variant="dark" className={"Navbar fixed-top"} expand="lg">
                            <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                                <Navbar.Brand href="/home" className={"logo"}>DiS</Navbar.Brand>
                                <Nav className="mr-auto navbarLinks"/>
                            </Col>
                            <Col className="d-md-flex d-block flex-row mx-md-auto mx-0"/>
                            <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                                <Navbar.Collapse className="justify-content-end navbarLinks" on>
                                    <Nav.Link className={"navbarLinksRight"} href="/testRegister">Register</Nav.Link>
                                    <Nav.Link className={"navbarLinksRight"} href="/login">Login</Nav.Link>
                                    {/*<Nav.Link className={"navbarLinksRight"} href="/errorPage">errorPage</Nav.Link>*/}
                                </Navbar.Collapse>
                            </Col>
                        </Navbar>
                        <Switch>
                            <Route exact path="/home" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/errorPage" component={Tetris} />
                        </Switch>
                    </div>
                </Router>
            );
        }else{
            const currentUser = AuthService.getCurrentUser();
            const username = currentUser.user.username;
            return (
                <Router>
                    <div className="App">
                        <Navbar bg="dark" variant="dark" className={"Navbar fixed-top"} expand="lg">
                            <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                                <Navbar.Brand href="/home" className={"logo"}>DiS</Navbar.Brand>
                                <Nav className="mr-auto navbarLinks">
                                    <Nav.Link className={"navbarLinksLeft"} href="/feed">NewsFeed</Nav.Link>
                                    <Nav.Link className={"navbarLinksLeft"} href="/forum">Forum</Nav.Link>
                                </Nav>
                            </Col>
                            <Col className="d-md-flex d-block flex-row mx-md-auto mx-0 searchBar">
                                <SearchBarResultPageComponent visitor={this.visitor} searchParam={this.searchParam}/>
                            </Col>
                            <Col className="d-md-flex d-block flex-row mx-md-auto mx-0">
                                <Navbar.Collapse className="justify-content-end navbarLinks" on>
                                    <Nav.Link className={"navbarLinksRight"} href="/messenger">Messages</Nav.Link>
                                    <Nav.Link className={"navbarLinksRight"} href={`/profile/${username}`}>{username}</Nav.Link>
                                    <Divider orientation="vertical" style={{backgroundColor:"whitesmoke"}} flexItem />
                                    <Nav.Link className={"navbarLinksRight navbar-btn"} href="/logout">Log Out</Nav.Link>
                                </Navbar.Collapse>
                            </Col>

                        </Navbar>
                        <Switch>
                            <Route exact path="/home" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/profile/:username" component={Profile} />
                            <Route path="/feed" component={NewsFeed} />
                            <Route exact path="/forum" component={Forum} />
                            <Route path="/logout" component={LogOut} />
                            <Route exact path="/messenger" component={Messenger} />
                            <Route path="/errorPage" component={Tetris} />
                            {/*<Route path="/messenger/:userLogged/:name" component={Messenger} />*/}
                        </Switch>
                    </div>
                </Router>
            );
    }
  }

}

export default App;
