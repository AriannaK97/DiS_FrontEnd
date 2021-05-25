import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service"
import Grid from "@material-ui/core/Grid";
import FormDialog from "./postForm.component";

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
        backgroundColor: red[500],
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "1%",
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


export default function PostCard() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [reaction, setReaction] = useState(null);
    const user = AuthService.getCurrentUser();
    const [reactionColour, setReactionColour] = useState('gray');
    const [reactionType, setReactionType] = useState(0);
    const username = user.user.username;


    useEffect(async () => {
            const result = await UserService.getUserNewsFeed().then(response => {
                setPosts(response.data);
                console.log(response.data)
            })
        },
        [],
    );

    const handleReaction = (evt, post) => {
        evt.preventDefault();
        UserService.postReaction(post.id, username, ).then(response => response.status);
        UserService.getReaction().then(response => setReaction(response.data));
        setReactionColour('red');
    }


    let cardsArray = null
    if(posts){
        cardsArray = posts.map(post => (
            <Grid item key={post.id} className={classes.cardStyle}>
                <Card id={post.id} style={{ color:'whitesmoke'}} className={classes.root}>
                    <CardHeader         classes={{title: classes.CardHeader,subheader: classes.CardHeader}}
                            style={{ color:'whitesmoke'}}
                            avatar={
                            <Avatar alt={post.user} aria-label="post" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={post.user}
                        subheader={post.postTime}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ color:'whitesmoke'}}>
                            {post.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon id={post.id} style={{color: reactionColour}} onClick={handleReaction}/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon style={{color: 'green'}}/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        ));
    }


    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.alignItemsAndJustifyContent}>
            <FormDialog/>
            {cardsArray}
        </Grid>
    );
}