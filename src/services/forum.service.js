import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/forum';

class ForumService{

    errorHandling(error) {
        console.log(error);
        if (error.response.status === 401) {
            window.location.href = '/login';
        }else if(error.response.status >= 300 || error.response.status <= 200){
            window.location.href = "/errorPage";
        }
        else {
            console.log(error);
        }
    }

    postPage(title){
        return axios.post(API_URL+"/page", {title},
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    postPageRating(username, pageId, pageTitle, rating){
        return axios.post(API_URL+"/page/pageRating", {username, pageId, pageTitle, rating},
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    postForumThread(title, pageId){
        return axios.post(API_URL+"/page/thread", {title, pageId},
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    postForumThreadPost(content, creatorUsername, threadId){
        return axios.post(API_URL+"/page/thread/threadPost", {content, creatorUsername, threadId},
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    postForumThreadPostUpvote(threadPostId, username){
        return axios.post(API_URL+"/page/thread/threadPost/upvote", {threadPostId, username},
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    deleteForumThreadPostUpVote(threadPostId, username){
        return axios.delete(API_URL+"/page/thread/threadPost/upvote",
            {threadPostId, username}, { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getPage(id= null, title= null){
        if(id !== null){
            return axios.get(API_URL+"/page/"+id,
                { headers: authHeader() }).catch(err => {this.errorHandling(err);});
        }else if(title !== null){
            return axios.get(API_URL+"/page/?title="+title,
                { headers: authHeader() }).catch(err => {this.errorHandling(err);});
        }
    }

    getForumThread(id){
        return axios.get(API_URL+"/page/thread/" + id,
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getForumThreadPost(id){
        return axios.get(API_URL+"/page/thread/threadPost/" + id,
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getPages(currentUsername){
        return axios.get(API_URL+"/pages/?currentUsername="+currentUsername,
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getPageThreads(pageId){
        return axios.get(API_URL+"/page/"+pageId+"/threads",
            { headers: authHeader() }).catch(err => {this.errorHandling(err);});
    }

    getThreadPosts(threadId, currentUsername){
        console.log(threadId);
        const req = API_URL + "/page/thread/" + threadId + "/threadposts/?currentUsername=" + currentUsername;
        return axios.get(req,{headers: authHeader()})
    }

}

export default new ForumService();