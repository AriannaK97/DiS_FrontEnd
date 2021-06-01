import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/forum';

class ForumService{

    errorHandling(error) {
        if (error.response.status === '403') {
            window.location.href = '/login';
        }else if(error.response.status >= 300 && error.response.status <= 199){
            window.location.href = "/errorPage";
        }
        else {
            console.log(error);
        }
    }

    postPage(title){
        return axios.post(API_URL+"/page", {title}, { headers: authHeader() });
    }

    postPageRating(username, pageId, pageTitle, rating){
        return axios.post(API_URL+"/page/pageRating", {username, pageId, pageTitle, rating}, { headers: authHeader() });
    }

    postForumThread(title, pageId){
        return axios.post(API_URL+"/page/thread", {title, pageId}, { headers: authHeader() });
    }

    postForumThreadPost(content, creatorUsername, threadId){
        return axios.post(API_URL+"/page/thread/threadPost", {content, creatorUsername, threadId}, { headers: authHeader() });
    }

    postForumThreadPostUpvote(threadPostId, username){
        return axios.post(API_URL+"/page/thread/threadPost/upvote", {threadPostId, username}, { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }


    getPage(id= null, title= null){
        if(id !== null){
            return axios.get(API_URL+"/page/"+id, { headers: authHeader() })
        }else if(title !== null){
            return axios.get(API_URL+"/page/?title="+title, { headers: authHeader() })
        }
    }

    getForumThread(id){
        return axios.get(API_URL+"/page/thread/" + id, { headers: authHeader() });
    }

    getForumThreadPost(id){
        return axios.get(API_URL+"/page/thread/threadPost/" + id, { headers: authHeader() });
    }

    getPages(currentUsername){
        return axios.get(API_URL+"/pages/?currentUsername="+currentUsername, { headers: authHeader() });
    }

    getPageThreads(pageId){
        return axios.get(API_URL+"/page/"+pageId+"/threads", { headers: authHeader() });
    }

    getThreadPosts(threadId, currentUsername){
        console.log(threadId);
        if(threadId!==null) {
            return axios.get(API_URL + "/page/thread/" + threadId + "/threadposts/?currentUsername=" + currentUsername, {headers: authHeader()});
        }
    }

}

export default new ForumService();