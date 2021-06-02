import React, {useEffect, useState} from "react";
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
import {useParams} from "react-router";
import ReactionList from "../feed/reactionList.component";
import Fab from "@material-ui/core/Fab";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
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


export default function Profile() {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState();
    const [userColor, setUserColor] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const nullReactionState = useState(0);
    const happyReactionState =  useState(1);
    const sadReactionState = useState(2);
    const [userFeedPosts, setUserFeedPosts] = useState([]);

    let { username } = useParams();
    console.log(username)


    useEffect(() => {
        AuthService.getProfileByUsername(username).then(response=>{
            setUserFeedPosts(response.data.userFeedPosts);
            setCurrentUser(response.data);
            setUserColor(response.data.color);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        })
        },
        [username],
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

    const handleMessageButton = () => {
        window.location.href = `/messenger`;
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
    if(userFeedPosts){
        cardsArray = userFeedPosts.map(post => (
            <Grid item key={post.id} className={classes.cardStyle}>
                <Card id={post.id} style={{ color:'whitesmoke'}} className={classes.root}>
                    <CardHeader classes={{title: classes.CardHeader,subheader: classes.CardHeader}}
                                style={{ color:'whitesmoke'}}
                                avatar={
                                    <Avatar alt={post.username} aria-label="post" className={classes.avatar} style={{backgroundColor: userColor}}/>
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
        <div className="container" style={{marginTop: "95px", marginBottom: "-60px"}}>
            <header className="jumbotron" style={{margin:"auto", width: 500,backgroundColor: "#343a40", borderRadius: 16, borderWidth: 1,color: "whitesmoke !important"}}>
                <h3 style={{marginTop: "-8%"}}>
                    <strong style={{color: "whitesmoke"}}>{username}</strong>
                </h3>
                <h6 style={{color: "whitesmoke"}}>{firstName} {lastName} </h6>
                <h7 style={{color: "whitesmoke"}}>{email}</h7>
                <Avatar alt={username} aria-label="post" className={classes.large} style={{backgroundColor: userColor, margin:"20px auto -30px auto"}}/>
            </header>
            <Fab size={"large"} color="secondary" aria-label="edit" style={{margin: "-11% auto auto 35%", zIndex: 2, backgroundColor: "#8a37ea"}} onClick={handleMessageButton}>
                <ChatBubbleOutlineIcon />
            </Fab>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.alignItemsAndJustifyContent}>
                <FormDialog username={username}/>
                {cardsArray}
            </Grid>
        </div>
    );
}

