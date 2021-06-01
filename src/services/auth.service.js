import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
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
            });
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
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getProfileByUsername(username) {
        return axios.get(API_URL+"profile/"+username);
    }

}

export default new AuthService();
