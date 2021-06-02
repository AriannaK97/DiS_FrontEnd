import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

    errorHandling(error) {
        if (error.response.status === 401) {
            this.logout();
            window.location.href = '/login';
        }
        else if (error.response.status >= 300 || error.response.status <= 200){
            window.location.href = '/errorPage';
        }
        else {
            console.log(error);
        }
    }

    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                /*if (response.data.accessToken) {*/
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            })//.catch(err => {this.errorHandling(err);});
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.clear();
    }

    register(username, email, phone, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            phone,
            password
        })//.catch(err => {this.errorHandling(err);});
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getProfileByUsername(username) {
        return axios.get(API_URL+"profile/"+username).catch(err => {this.errorHandling(err);});
    }

}

export default new AuthService();
