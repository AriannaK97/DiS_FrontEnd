import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ForumService from "../../services/forum.service";
import Alert from "@material-ui/lab/Alert";
import PostAddIcon from '@material-ui/icons/PostAdd';
import AuthService from "../../services/auth.service"
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Tooltip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    postButton:{
        // margin: "2% auto auto 85%",
        zIndex: 2,
        // marginRight: theme.spacing(1),
    },
    dialog:{
        width: "500 !important",
    }
}));

export default function FormDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('')
    const [posted, setPosted] = useState(false);
    const threadId = props.id;
    const threadName = props.name;
    const user = AuthService.getCurrentUser()
    const username = user.user.username;


    let alertBanner = null
    if(posted === true) {
        alertBanner = <Alert severity="success">Page created!</Alert>;
        setTimeout(function(){
            setPosted(false);
        },3000);
    }

    const handleCreate = () =>{
        ForumService.postForumThreadPost(content, username, threadId).then(response => response.status);
        setPosted(true);
        setOpen(false);
        setContent("");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <Tooltip title="Add Question" aria-label="add">
                <Fab aria-label="add post" className={classes.postButton} style={{backgroundColor: "#ba93e2"}}>
                    <AddIcon onClick={handleClickOpen}/>
                </Fab>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div style={{width: 600}}>
                <DialogTitle id="form-dialog-title">New Question</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write your question in thread {threadName}.
                    </DialogContentText>
                    <TextField
                        multiline
                        autoFocus
                        aria-colspan={20}
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        onChange={e => setContent(e.target.value)}
                        value={content}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Post
                    </Button>
                </DialogActions>
                    </div>
            </Dialog>
        </div>
    );
}
