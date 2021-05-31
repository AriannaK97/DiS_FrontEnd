import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForumService from "../../services/forum.service"
import PageForm from "./pageForm"
import ClassIcon from '@material-ui/icons/Class';
import PageThreadsList from "./pageThreadList"
import ThreadPostList from "./threadPostList"
import ThreadPostForm from "./threadPostForm"
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service"
import PageRating from "./pageRating"



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
        backgroundColor: "whitesmoke",
        padding: theme.spacing(3),
    },
}));


export default function PermanentDrawerLeft() {
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
    const [currentRating, setCurrentRating] = useState(0);
    const currentUser = AuthService.getCurrentUser();
    const username = currentUser.user.username;

    useEffect(() => {
        ForumService.getPages().then(response => {
            setPages(response.data);
            console.log(response.data);
        })
    },[])

    const selectPage = (pageId, title, page) => {
        setSelectedPage(pageId);
        setSelectedPageTitle(title);
        setSelectedThreadName('');
        setShowThreadSection(true);
        setShowRating(true);
    }

    let pagesList = null;
    if(pages){
        pagesList = pages.map(page => (
            <ListItem button key={page.title} onClick={()=>selectPage(page.id, page.title)}>
                <ListItemIcon><ClassIcon /></ListItemIcon>
                <ListItemText primary={page.title} />
            </ListItem>
        ))
    }

    let threadSection;
    if(showThreadSection){
        threadSection =
            <PageThreadsList
                pageId={selectedPage}
                threadPathSetter={setSelectedThreadPath}
                setSelectedThreadId={setSelectedThreadId}
                setSelectedThreadName={setSelectedThreadName}
                setShowThreadSectionPost={setShowThreadSectionPost}
            />
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
                    <Typography style={{marginTop:"7%"}} variant="h6" noWrap>
                        Forum Pages
                    </Typography>
                </div>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Pages</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails style={{paddingRight:"0px", paddingLeft: "0px"}}>
                        <List >
                            <PageForm/>
                            {pagesList}
                        </List>
                    </AccordionDetails>
                </Accordion>

                <Divider />
                {threadSection}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ThreadPostList selectedThreadId={selectedThreadId} />
                {addNewThreadPost}
            </main>
        </div>
    );
}