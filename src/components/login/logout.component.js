import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";

export default function logOut() {
    AuthService.logout();
    window.location.href = '/login';

}