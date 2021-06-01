import Button from "@material-ui/core/Button";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import {PersonIcon} from "@livechat/ui-kit";
import React, {useEffect, useState} from "react";
import {blue} from "@material-ui/core/colors";
import UserService from "../../services/user.service";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import {Nav} from "react-bootstrap";


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
}));



export default function SearchBarResultPageComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchParam = props.searchParam;
    const visitor = props.visitor;



    const handleClickOpen = () => {
        UserService.getSearch(searchParam).then(response => {
            setSearchResults( response.data)
            console.log(searchResults);
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const redirectToUserProfile = (user) => {
    //     return(
    //         <SearchUserProfile user={user}/>
    //     );
    // }

    return (
        <div>
            <Fab size="small" onClick={handleClickOpen} color="secondary" aria-label="search" className={classes.button}>
                <SearchIcon />
            </Fab>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle style={{width:400}} id="simple-dialog-title">Search Results:</DialogTitle>
                <List>
                    {searchResults.map((searchResult) => (
                        <Nav.Link href={"/searchUserResult"}>
                        <ListItem button key={searchResult.id} >
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={searchResult.username} />
                        </ListItem>
                        </Nav.Link>
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