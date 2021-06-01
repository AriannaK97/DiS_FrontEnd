import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8080/api/tests/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    errorHandling(error) {
        if (error.response.status === '403') {
            window.location.href = '/testLogin';
        }
        else {
            console.log(error);
        }
    }

    getAllUsers() {
        return axios.get(API_URL + 'users', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    postUserFeedPost(content, username){
        return axios.post('http://localhost:8080/feed/post', {content ,username}, { headers: authHeader() });
    }

    //todo: fix error handling for the rest
    getUserNewsFeed(){
        return axios.get('http://localhost:8080/feed/newsfeed/'+ AuthService.getCurrentUser().user.username,
            { headers: authHeader() }).catch(err => {this.errorHandling(err);})


    }

    postReaction(postId, username, reactionType){
        console.log(postId, username, reactionType);
        return axios.post('http://localhost:8080/feed/reaction',{postId, username, reactionType}, { headers: authHeader() });
    }

    getReaction(){
        return axios.get('http://localhost:8080/feed/reaction', { headers: authHeader() })
    }

    getSearch(searchParam){
        return axios.get("http://localhost:8080/search/users/?keyword="+searchParam, { headers: authHeader() })
    }

    deletePostReaction(postId, username){
        return axios.delete("http://localhost:8080/feed/reaction/?postId="+postId+"&username="+username, { headers: authHeader() })
    }
}

export default new UserService();
