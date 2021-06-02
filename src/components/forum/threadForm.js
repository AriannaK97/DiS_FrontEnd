import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListItemText from "@material-ui/core/ListItemText";
import ForumService from "../../services/forum.service";
import Alert from "@material-ui/lab/Alert";

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('')
    const [posted, setPosted] = useState(false);
    const pageId = props.id;


    let alertBanner = null
    if(posted === true) {
        alertBanner = <Alert severity="success">Page created!</Alert>;
        setTimeout(function(){
            setPosted(false);
        },3000);
    }

    const handleCreate = () =>{
        ForumService.postForumThread(title, pageId).then(response => response.status);
        setPosted(true);
        setOpen(false);
        setTitle("");
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ListItem button onClick={handleClickOpen} style={{backgroundColor: "#ccb0e7"}}>
                <ListItemIcon><AddCircleOutlineIcon/></ListItemIcon>
                <ListItemText primary={"New Thread"}/>
            </ListItem>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Thread</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new thread, please enter its title here.
                    </DialogContentText>
                    <TextField
                        multiline
                        autoFocus
                        aria-colspan={20}
                        margin="dense"
                        id="name"
                        label="Thread Title"
                        type="text"
                        fullWidth
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
