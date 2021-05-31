import React, {Component, useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormDialog from "../feed/postForm.component";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from "@material-ui/icons/Share";
import UserService from "../../services/user.service";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    root: {
        // maxWidth: 345,
        width: 500,
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: '#343a40',
        color: "whitesmoke !important"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        backgroundColor: '#343a40',
        borderRadius: 16,
        borderWidth: 1,
    },
    cardStyle: {
        margin: '2%',
        color: 'whitesmoke'
    },
    CardHeader: {
        color: "whitesmoke"
    },
}));

// noinspection DuplicatedCode
export default function Profile() {
    const classes = useStyles();
    const currentUser = AuthService.getCurrentUser();
    const userColour = currentUser.user.color;
    const username = currentUser.user.username;
    const [posts, setPosts] = useState([ ]);
    const nullReactionState = useState(0);
    const happyReactionState =  useState(1);
    const sadReactionState = useState(2);


    useEffect(() => {
            setPosts(currentUser.user.userFeedPosts);
            console.log(currentUser);
        },
        [],
    );

    const handleReaction = (id, username, reactionType) => {
        console.log("test " + reactionType);
        if(reactionType === 0){
            UserService.deletePostReaction(id, username).then(response => response.status);
            return <Redirect to={"/feed"}/>
        }else{
            console.log("post reaction");
            UserService.postReaction(id, username, reactionType).then(response => response.status);
            return <Redirect to={"/feed"}/>
        }
    }

    const renderReactionIcons = (post) => {
        if(post.pageTitle === null){
            if(post.currentUserReaction === 0 || post.currentUserReaction === null){
                return(
                    <div>
                        <IconButton aria-label="add to favorites">
                            <SentimentSatisfiedAltIcon id={post.postId} style={{color: 'gray'}} onClick={() => handleReaction(post.postId, username[0], happyReactionState[0])}/>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                            <SentimentVeryDissatisfiedIcon id={post.postId} style={{color: "gray"}} onClick={() => handleReaction(post.postId, username[0], sadReactionState[0])}/>
                        </IconButton>
                    </div>
                );
            }else if(post.currentUserReaction === 1){
                return(
                    <div>
                        <IconButton aria-label="add to favorites">
                            <SentimentSatisfiedAltIcon id={post.postId} style={{color: 'forestgreen'}} onClick={() => handleReaction(post.postId, username[0], nullReactionState[0])}/>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                            <SentimentVeryDissatisfiedIcon id={post.postId} style={{color: "gray"}} onClick={() => handleReaction(post.postId, username[0], sadReactionState[0])}/>
                        </IconButton>
                    </div>
                );
            }else if(post.currentUserReaction === 2){
                return(
                    <div>
                        <IconButton aria-label="add to favorites">
                            <SentimentSatisfiedAltIcon id={post.postId} style={{color: 'gray'}} onClick={() => handleReaction(post.postId, username[0], happyReactionState[0])}/>
                        </IconButton>
                        <IconButton aria-label="add to favorites">
                            <SentimentVeryDissatisfiedIcon id={post.postId} style={{color: "indianred"}} onClick={() => handleReaction(post.postId, username[0], nullReactionState[0])}/>
                        </IconButton>
                    </div>
                );
            }
        }else{
            return(
                <div>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon id={post.postId} style={{color: 'gray'}} />
                    </IconButton>
                </div>
            );
        }
    }

    let cardsArray = null
    if(posts){
        cardsArray = posts.map(post => (
            <Grid item key={post.id} className={classes.cardStyle}>
                <Card id={post.id} style={{ color:'whitesmoke'}} className={classes.root}>
                    <CardHeader classes={{title: classes.CardHeader,subheader: classes.CardHeader}}
                                style={{ color:'whitesmoke'}}
                                avatar={
                                    <Avatar alt={post.username} aria-label="post" className={classes.avatar} style={{backgroundColor: post.userColor}}/>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={post.username}
                                subheader={post.postTime}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ color:'whitesmoke'}}>
                            {post.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {renderReactionIcons(post)}
                        <IconButton aria-label="share">
                            <ShareIcon style={{color: 'green'}}/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        ));
    }


    return (
        <div className="container" style={{marginTop: "70px"}}>
            <header className="jumbotron" style={{backgroundColor: "whitesmoke"}}>
                <h3>
                    <strong>{currentUser.user.username}</strong>
                </h3>
                <Avatar alt={username} aria-label="post" className={classes.large} style={{backgroundColor: userColour, margin:"20px auto -30px auto"}}/>
            </header>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.alignItemsAndJustifyContent}>
                <FormDialog/>
                {cardsArray}
            </Grid>
        </div>
    );
}

