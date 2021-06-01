import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import PageForm from "./pageForm";
import React, {useEffect, Fragment} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ClassIcon from "@material-ui/icons/Class";
import ListItemText from "@material-ui/core/ListItemText";
import ForumService from "../../services/forum.service";
import {Nav} from "react-bootstrap";
import {Route, useRouteMatch} from "react-router";


export default function PageList(props){

    let { path, url } = useRouteMatch();
    const setSelectedPage = props.setSelectedPage;
    const setSelectedPageTitle = props.setSelectedPageTitle;
    const setSelectedThreadName = props.setSelectedThreadName;
    const setShowThreadSection = props.setShowThreadSection;
    const setShowRating = props.setShowRating;
    const setCurrentRating = props.setCurrentRating;
    const username = props.username;
    const setPages = props.setPages;
    const classes = props.classes;
    const pages = props.pages;
    const pageId = props.pageId;

    useEffect(() => {
        ForumService.getPages(username).then(response => {
            setPages(response.data);
            console.log(response.data);
        })
    },[])

    const selectPage = (pageId, title, rating) => {
        setSelectedPage(pageId);
        setSelectedPageTitle(title);
        setSelectedThreadName('');
        setShowThreadSection(true);
        setShowRating(true);
        setCurrentRating(rating)
    }

    let pagesList = null;
    if(pages){
        pagesList = pages.map(page => (
                <ListItem id={page.pageId} button key={page.title} onClick={()=>selectPage(page.pageId, page.title, page.currentUserRating)} >
                    <ListItemIcon><ClassIcon /></ListItemIcon>
                    <ListItemText primary={page.title}/>
                </ListItem>
            )
        );
    }


    return(
        <div>
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
                        <PageForm id={1}/>
                        {pagesList}
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>

    );
}