import Button from "@material-ui/core/Button";
import {
    Dialog,
    DialogActions,
    DialogTitle, Input,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles, TextField
} from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import {PersonIcon} from "@livechat/ui-kit";
import React, {useEffect, useState} from "react";
import {blue} from "@material-ui/core/colors";
import UserService from "../../services/user.service";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import {Col, Form, Nav} from "react-bootstrap";


const useStyles = makeStyles((theme)=>({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    extendedIcon: {
        marginRight: theme.spacing(0.5),
    },
    button: {
        margin: theme.spacing(0.4),
    },
    searchIcon:{
        marginTop: "0.6ch",
        marginRight: "6px",
        color: "#ba93e2"
    },
    searchBar: {
        backgroundColor: "whitesmoke",
        borderRadius: "50px 50px 50px 50px !important",
        marginTop: "0.5ch !important",
        margin: "auto !important",
        borderColor: "transparent !important"
    }
}));



export default function SearchBarResultPageComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);


    const handleClose = () => {
        setOpen(false);
    };

    const keyPress = (e) => {
        if(e.keyCode === 13){
            console.log('value', e.target.value);
            UserService.getSearch(e.target.value).then(response => {
                setSearchResults( response.data)
                console.log(searchResults);
            })
            setOpen(true);
            e.target.value=null;
        }
    }

    const redirectToUserProfile = (username) => {
        window.location.href = `/profile/${username}`;
    }

    return (
        <div>
            <SearchIcon className={classes.searchIcon}/>
            <TextField  InputProps={{ disableUnderline: true }} type="text" placeholder="Search" className={classes.searchBar} onKeyDown={e=>keyPress(e)}/>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle style={{width:400}} id="simple-dialog-title">Search Results:</DialogTitle>
                <List>
                    {searchResults.map((searchResult) => (
                        // <Nav.Link href={ `/profile/${username}`}>
                        <ListItem button key={searchResult.id} onClick={()=>redirectToUserProfile(searchResult.username)}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={searchResult.username} />
                        </ListItem>
                        // </Nav.Link>
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