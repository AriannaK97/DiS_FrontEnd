import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PageThreadsList from "./pageThreadList"
import ThreadPostList from "./threadPostList"
import ThreadPostForm from "./threadPostForm"
import AuthService from "../../services/auth.service"
import PageRating from "./pageRating"
import {useRouteMatch} from "react-router";
import PageList from "./pageList.component"
import {useParams} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        marginTop: "4%",
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        height: "100vh",
        backgroundColor: "whitesmoke",
        marginTop: '4%',
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        margin: "5% auto auto auto",
        flexGrow: 1,
        // backgroundColor: "whitesmoke",
       // padding: theme.spacing(3),
    },
    // body: {
    //     backgroundColor: "whitesmoke !important",
    // }
}));


export default function PermanentDrawerLeft(props) {
    let { path, url } = useRouteMatch();
    // let { page.title } = useParams();
    const classes = useStyles();
    const [pages, setPages] = useState([ ]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [selectedPageTitle, setSelectedPageTitle] = useState('');
    const [showRating, setShowRating] = useState(false)
    const [showThreadSectionPost, setShowThreadSectionPost] = useState(false);
    const [showThreadSection, setShowThreadSection] = useState(false);
    const [selectedThreadPath, setSelectedThreadPath] = useState('');
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const [selectedThreadName, setSelectedThreadName] = useState('');
    const [currentRating, setCurrentRating] = useState();
    const currentUser = AuthService.getCurrentUser();
    const username = currentUser.user.username;
    const [showThreadPosts, setShowThreadPosts] = useState(false);

    let { pageId, threadId } = useParams();


    let threadSection;
    if(showThreadSection){
        threadSection =
            <PageThreadsList
                pageId={selectedPage}
                threadPathSetter={setSelectedThreadPath}
                setSelectedThreadId={setSelectedThreadId}
                setSelectedThreadName={setSelectedThreadName}
                setShowThreadSectionPost={setShowThreadSectionPost}
                setShowThreadPosts={setShowThreadPosts}
            />
    }

    const renderThreadPosts = () => {
        if(showThreadPosts){
            console.log(selectedThreadId);
            return(
                <ThreadPostList selectedThreadId={selectedThreadId} />
            )
        }
    }


    let addNewThreadPost;
    if(showThreadSectionPost){
        addNewThreadPost = <ThreadPostForm id={selectedThreadId} name={selectedThreadName}/>;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar style={{marginTop: '4%', backgroundColor: '#6e419a'}} position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {selectedPageTitle+" "+selectedThreadName}
                    </Typography>
                    <PageRating
                        showRating={showRating}
                        username={username}
                        selectedThreadPath={selectedThreadPath}
                        pageTitle={selectedPageTitle}
                        pageId={selectedPage}
                        currentRating={currentRating}
                    />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}>
                    <Typography style={{marginTop:"7%"}} variant="h6" noWrap>Forum</Typography>
                </div>
                <Divider />
                    <PageList
                        setSelectedPage={setSelectedPage}
                        setSelectedPageTitle={setSelectedPageTitle}
                        setSelectedThreadName={setSelectedThreadName}
                        setShowThreadSection={setShowThreadSection}
                        setShowRating={setShowRating}
                        username={username}
                        setPages={setPages}
                        classes={classes}
                        pages={pages}
                        setCurrentRating={setCurrentRating}
                    />
                <Divider />
                {threadSection}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {renderThreadPosts()}
                {addNewThreadPost}
            </main>


        </div>
    );
}