import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8080/forum/';

class ForumService{
    postPage(title){
        return axios.post(API_URL+"/page", {title});
    }

    postPageRating(username, pageId, pageTitle, rating){
        return axios.post(API_URL+"/page/pageRating", {username, pageId, pageTitle, rating});
    }

    postForumThread(title, pageId){
        return axios.post(API_URL+"/page/thread", {title, pageId});
    }

    postForumThreadPost(content, creatorUsername, threadId){
        return axios.post(API_URL+"/page/thread/threadPost", {content, creatorUsername, threadId});
    }

    postForumThreadPostUpvote(threadPostId, username){
        return axios.post(API_URL+"/page/thread/threadPost/upvote", {threadPostId, username});
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

    getPages(){
        return axios.get(API_URL+"/page/pages", { headers: authHeader() });
    }

    getPageThreads(pageId){
        return axios.get(API_URL+"/page/"+pageId+"/threads", { headers: authHeader() });
    }

    getThreadPosts(threadId){
        return axios.get(API_URL+"/page/threads/"+threadId+"/threadposts", { headers: authHeader() });
    }

}