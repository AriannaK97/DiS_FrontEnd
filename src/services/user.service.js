import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8080/api/tests/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    errorHandling(error) {
        if (error.response.status === 401) {
            AuthService.logout();
            window.location.href = '/login';
        }else if(error.response.status >= 300 || error.response.status <= 200){
            window.location.href = "/errorPage";
        }
        else {
            console.log(error);
        }
    }

    getAllUsers() {
        return axios.get(API_URL + 'users', { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    postUserFeedPost(content, username){
        return axios.post('http://localhost:8080/feed/post', {content ,username},
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    //todo: fix error handling for the rest
    getUserNewsFeed(){
        return axios.get('http://localhost:8080/feed/newsfeed/'+ AuthService.getCurrentUser().user.username,
            { headers: authHeader() }).catch(err => {this.errorHandling(err);})


    }

    postReaction(postId, username, reactionType){
        console.log(postId, username, reactionType);
        return axios.post('http://localhost:8080/feed/reaction',{postId, username, reactionType}, { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getReaction(){
        return axios.get('http://localhost:8080/feed/reaction', { headers: authHeader() }).catch(err => {this.errorHandling(err);})
    }

    getSearch(searchParam){
        return axios.get("http://localhost:8080/search/users/?keyword="+searchParam, { headers: authHeader() }).catch(err => {this.errorHandling(err);})
    }

    deletePostReaction(postId, username){
        return axios.delete("http://localhost:8080/feed/reaction/?postId="+postId+"&username="+username, { headers: authHeader() }).catch(err => {this.errorHandling(err);})
    }
}

export default new UserService();
