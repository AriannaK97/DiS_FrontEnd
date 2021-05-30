import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";

export default function logOut() {

    function refreshPage() {
        window.location.reload(true);
    }

    AuthService.logout();
    refreshPage();
    return <Redirect to={"/"}/>;

}