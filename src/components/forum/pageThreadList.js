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
import {BrowserRouter, Route} from "react-router-dom";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
}));


export default function PageThreadList(props){
    const classes = useStyles();
    const pageId = props.pageId;
    const threadPathSetter = props.threadPathSetter;
    const setSelectedThreadName = props.setSelectedThreadName;
    const setSelectedThreadId = props.setSelectedThreadId;
    const [pageThreads, setPageThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState();
    const setShowThreadSectionPost = props.setShowThreadSectionPost;
    console.log("pageThreadList" + pageId)

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
        console.log("here i am")
    };

    return(

        <List>
            <ThreadForm id={pageId}/>
            {pageThreads.map(thread => (
                <div>
                    <ListItem href={"/"+thread.title} button key={thread.title} onClick={()=>handleSelect(thread.title, thread.id)}>
                        <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
                        <ListItemText primary={thread.title} />
                        <Link to={"/"+selectedThread}/>
                    </ListItem>
                    <Switch>
                        <Route path={"/"+selectedThread} component={thread} />
                    </Switch>
                </div>
            ))}
        </List>
    )
}