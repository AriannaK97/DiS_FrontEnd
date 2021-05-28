import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";
import App from "../../App"
import {render} from "@testing-library/react";

export default function logOut() {
    AuthService.logout();
    return <Redirect to={"/"}><App.forceAppUpdate/></Redirect>;

}