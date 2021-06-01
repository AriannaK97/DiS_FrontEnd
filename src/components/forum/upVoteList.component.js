import Button from "@material-ui/core/Button";

import {
    Badge,
    Dialog,
    DialogActions,
    DialogTitle,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles, TextField
} from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import {PersonIcon} from "@livechat/ui-kit";
import React, {useState} from "react";
import {blue} from "@material-ui/core/colors";


const useStyles = makeStyles((theme)=>({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function UpvoteList(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const upVotes = props.upVotes;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const redirectToUserProfile = (username) => {
        window.location.href = `/profile/${username}`;
    }

    return (
        <div>
        <Badge onClick={handleClickOpen} badgeContent={upVotes.length} color="secondary" />
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Users up-voting this post:</DialogTitle>
            <List>
                {upVotes.map((upVote) => (
                    <ListItem button key={upVote} onClick={()=>redirectToUserProfile(upVote)}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={upVote} />
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