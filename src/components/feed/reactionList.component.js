import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
    Badge,
    Dialog,
    DialogActions,
    DialogTitle,
    ListItem,
    ListItemAvatar, ListItemIcon,
    ListItemText,
    makeStyles, TextField
} from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import {PersonIcon} from "@livechat/ui-kit";
import React, {useState} from "react";
import {blue} from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import * as PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import * as theme from "@material-ui/system";
import {CenterFocusStrong} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles((theme)=>({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

class NavigationIcon extends React.Component {
    render() {
        return null;
    }
}

NavigationIcon.propTypes = {className: PropTypes.any};
export default function ReactionList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const userReactions = props.userReactions;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const redirectToUserProfile = (username) => {
        window.location.href = `/profile/${username}`;
    }

    const reactionType = (userReaction) => {
        if(userReaction.reactionType===1){
            return(
                <div>
                    <IconButton aria-label="add to favorites">
                        <SentimentSatisfiedAltIcon style={{color: 'forestgreen'}}/>
                    </IconButton>
                </div>
            )
        }else if(userReaction.reactionType===2){
            return(
                <div>
                    <IconButton aria-label="add to favorites">
                        <SentimentVeryDissatisfiedIcon style={{color: "indianred"}}/>
                    </IconButton>
                </div>
            )
        }
    }


    return (
        <div>
            <Badge onClick={handleClickOpen} badgeContent={userReactions.length} color="secondary" />
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Users reacted to this post:</DialogTitle>
                <List>
                    {userReactions.map((userReaction) => (
                        <ListItem button key={userReaction.username} onClick={()=>redirectToUserProfile(userReaction.username)}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={userReaction.username} />
                            <ListItemIcon>{reactionType(userReaction)}</ListItemIcon>
                        </ListItem>
                    ))}
                </List>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}