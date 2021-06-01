import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemText from "@material-ui/core/ListItemText";
import React, {useEffect, useState} from "react";
import ForumService from "../../services/forum.service";
import {makeStyles} from "@material-ui/core/styles";
import ThreadForm from "./threadForm"
import Switch from "react-bootstrap/Switch";
import {Route, useParams} from "react-router-dom";
import {Nav} from "react-bootstrap";
import ThreadPostList from "./threadPostList";
import {useRouteMatch} from "react-router";


const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));


export default function PageThreadList(props){
    // let { pageId } = useParams();
    // let { path, url } = useRouteMatch();
    const pageId = props.pageId;
    const threadPathSetter = props.threadPathSetter;
    const setSelectedThreadName = props.setSelectedThreadName;
    const setSelectedThreadId = props.setSelectedThreadId;
    const [pageThreads, setPageThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState();
    const setShowThreadSectionPost = props.setShowThreadSectionPost;
    const setThreadListSwitch =  props.setThreadListSwitch;




    useEffect(() => {
        ForumService.getPageThreads(pageId).then(response => {
            setPageThreads(response.data);
            console.log(response.data);
        })
    },[pageId])


    const handleSelect = (title, id) => {
        threadPathSetter("/"+title);
        setSelectedThread(title);
        setSelectedThreadId(id);
        setSelectedThreadName(title);
        setShowThreadSectionPost(true);
        setThreadListSwitch(threadSwitch);
        console.log("here i am")
    };

    let threadSwitch
    return(
        <div>
        <List>
            <ThreadForm id={pageId}/>
            {pageThreads.map(thread => (
                <div>
                    {/*<Nav.Link id={thread.id} href={`${url}/${thread.id}`}>*/}
                    <ListItem id={thread.id} button key={thread.id} onClick={()=>handleSelect(thread.title, thread.id)}>
                        <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
                        <ListItemText primary={thread.title} />
                    </ListItem>
                    {/*</Nav.Link>*/}
                </div>
            ))}
        </List>
        </div>
    )
}