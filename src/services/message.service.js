import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8080/api/auth/';

class MessageService{

    postMessage(message, sender, recipient){
        return axios.post(API_URL+"/send", {message, sender, recipient});
    }

    getMessage(user, friend){
        return axios.get(API_URL + "/chatHistory/?user=" + user + "&friend=" + friend,  { headers: authHeader() })
    }

}