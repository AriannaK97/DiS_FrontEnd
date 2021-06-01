import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service"
import Grid from "@material-ui/core/Grid";
import FormDialog from "./postForm.component";
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ReactionList from "./reactionList.component";

const useStyles = makeStyles((theme) => ({
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
    avatar: {
        // backgroundColor: red[500],
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%",
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


export default function FeedCard() {
    const classes = useStyles();
    const [posts, setPosts] = useState([ ]);
    const nullReactionState = useState(0);
    const happyReactionState =  useState(1);
    const sadReactionState = useState(2);
    const user = AuthService.getCurrentUser();
    const username = useState(user.user.username);

    console.log(user.user);

    useEffect(() => {
            UserService.getUserNewsFeed().then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
        },
        [],
    );

    const handleReaction = (id, username, reactionType) => {
        console.log("test " + reactionType);
        if(reactionType === 0){
            UserService.deletePostReaction(id, username).then(response => response.status);
            window.location.href = '/feed';
        }else{
            console.log("post reaction");
            UserService.postReaction(id, username, reactionType).then(response => response.status);
            window.location.href = '/feed';
        }
    }

    //todo: for forum posts

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
                    <IconButton aria-label="add to favorites">
                        <ReactionList userReactions={post.userReactions}/>
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
                        <IconButton aria-label="add to favorites">
                            <ReactionList userReactions={post.userReactions}/>
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
                        <IconButton aria-label="add to favorites">
                            <ReactionList userReactions={post.userReactions}/>
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
                            <IconButton aria-label="settings" style={{color: 'gray'}}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={<strong style={{fontSize: 20}}>{post.username}</strong>}
                        subheader={<small>{post.postTime}</small>}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ color:'whitesmoke', fontSize: 15}}>
                            {post.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {renderReactionIcons(post)}
                        <IconButton aria-label="share">
                            <ShareIcon style={{color: 'gray'}}/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        ));
    }


    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.alignItemsAndJustifyContent}>
            <FormDialog username={user.user.username}/>
            {cardsArray}
        </Grid>
    );
}