import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormHelperText, Input, InputLabel, Paper,
    TextField
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import Alert from '@material-ui/lab/Alert';
import {Col, Row} from "react-bootstrap";
import {makeStyles} from "@material-ui/core/styles";
import UserService from "../../services/user.service"
import AuthService from "../../services/auth.service";
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
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
    DummyFrontForm: {
        width: 485,
        height: 100,
        backgroundColor: "#343a40",
        borderRadius: '100',
    },
    DummyInputLabel:{
        color:'lightgray',
        marginLeft: '-7%'
    },
    DummyFormHelperText: {
        color:'lightgray',
        borderBottomColor: 'lightgray',
        marginTop: '3%',
        marginLeft: '5%',
        fontSize: '14'
    },
    avatar: {
        marginTop: '8%',
        marginBottom: '-30%',
        marginLeft: '5%',
        backgroundColor: red[500],
    }
}));

export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState(null);
    const [user, setUser] = useState(null);
    const [posted, setPosted] = useState(false);

    let alertBanner = null
    if(posted === true) {
        alertBanner = <Alert severity="success">Succesfully posted!</Alert>;
        setTimeout(function(){
            setPosted(false);
        }.bind(this),3000);
    }

    const handleSubmit = (evt) => {
        setUser(AuthService.getCurrentUser());
        evt.preventDefault();
        setUser(AuthService.getCurrentUser());
        UserService.postUserFeedPost(content, user).then(response => response.status);
        setPosted(true);
        setOpen(false);
        setContent(null);
    }

    const handleClickOpen = () => {
        setOpen(true);
        setContent(content);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >{alertBanner}
        <Paper className={classes.alignItemsAndJustifyContent} square={false}>
        <FormControl className={classes.DummyFrontForm} variant={"outlined"} onClick={handleClickOpen} color={"secondary"} square={false} >
            <Row>
                <Col sm={2}>
                <Avatar aria-label="post" className={classes.avatar}>R</Avatar>
                </Col>
                <Col sm={10}>
                    <InputLabel className={classes.DummyInputLabel} htmlFor="my-input">Create Post</InputLabel>
                </Col>
            </Row>
            <Input id="my-input" aria-describedby="my-helper-text" disabled={true}/>
            <FormHelperText className={classes.DummyFormHelperText} id="my-helper-text">What's on your mind?</FormHelperText>
        </FormControl>
        <Dialog className={classes.MuiDialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" >Create Post</DialogTitle>
            <DialogContent>
                <DialogContentText>What's on your mind? </DialogContentText>
                <TextField
                    id="standard-multiline-flexible"
                    multiline
                    rowsMax={4}
                    aria-colspan={10}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    color={'secondary'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Post
                </Button>
            </DialogActions>
        </Dialog>
            </Paper>
        </div>
    );
}
