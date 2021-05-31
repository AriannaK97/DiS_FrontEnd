import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ForumService from "../../services/forum.service";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    root: {
        // maxWidth: 345,
        width: 1500,
        marginRight:"3% !important",
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


export default function ThreadPostList(props){
    const [threadPosts, setThreadPosts] = useState();
    const threadId = props.selectedThreadId;
    const classes = useStyles();
    const nullReactionState = useState(0);
    const upReactionState =  useState(1);
    const downReactionState = useState(2);
    const currentUser = AuthService.getCurrentUser();
    const username = currentUser.user.username

    useEffect(() => {
        ForumService.getThreadPosts(threadId).then(response => {
            setThreadPosts(response.data);
            console.log(response.data);
        })
    },[threadId])

    const handleVotes = (threadPostId, username, reactionType) => {
        console.log(threadPostId, username);
        ForumService.postForumThreadPostUpvote(threadPostId, username).then(response => response.status);
    }

    const renderVoteIcons = (post) => {
        console.log("here "+ post.id)
        if(post.currentUserReaction === 0 || post.currentUserReaction === null || true){
            return(
                <div>
                    <IconButton aria-label="add to favorites">
                        <ThumbUpIcon id={post.id} style={{color: 'gray'}} onClick={() => handleVotes(post.id, username, upReactionState[0])}/>
                    </IconButton>
                </div>
            );
        }else if(post.currentUserReaction === 1){
            return(
                <div>
                    <IconButton aria-label="add to favorites">
                        <ThumbUpIcon id={post.id} style={{color: 'forestgreen'}} onClick={() => handleVotes(post.id, username, nullReactionState[0])}/>
                    </IconButton>
                </div>
            );
        }
    }

    let cardsArray = null
    if(threadPosts){
        cardsArray = threadPosts.map(post => (
            <Grid item key={post.id} className={classes.cardStyle} >
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
                                subheader={post.timestamp}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ color:'whitesmoke'}}>
                            {post.content}
                        </Typography>
                    </CardContent>
                    {/*style={{marginLeft: "95%"}}*/}
                    <CardActions disableSpacing >
                        {renderVoteIcons(post)}
                    </CardActions>
                </Card>
            </Grid>
        ));
    }

    return(
        <Grid container direction="row" justify="center" alignItems="center">
            {cardsArray}
        </Grid>
    )

}