import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/tests/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
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
        return axios.post('http://localhost:8080/feed/post', {content ,username});
    }

    getUserNewsFeed(){
        return axios.get('http://localhost:8080/feed');
    }

    postReaction(postId, username, reactionType){
        return axios.post('http://localhost:8080/feed/reaction',{postId, username, reactionType});
    }

    getReaction(){
        return axios.get('http://localhost:8080/feed/reaction')
    }
}

export default new UserService();
