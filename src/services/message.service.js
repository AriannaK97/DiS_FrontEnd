import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/chat';

class MessageService{

    errorHandling(error) {
        if (error.response.status === '403') {
            window.location.href = '/login';
        }else if(error.response.status >= 300 || error.response.status <= 200){
            window.location.href = "/errorPage";
        }
        else {
            console.log(error);
        }
    }

    postMessage(message, sender, recipient){
        return axios.post(API_URL+"/send", {message, sender, recipient}, { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getMessage(user, friend){
        return axios.get(API_URL + "/chatHistory/?user=" + user + "&friend=" + friend,  { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getConversations(){
        return axios.get(API_URL+"/users", { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

}

export default new MessageService();