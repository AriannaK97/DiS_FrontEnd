import React, { Component } from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";


export default function Home () {

    return(
        <Container style={{backgroundColor: '#282c34', color: "whitesmoke", borderRadius: 16, borderWidth: 1, width: 500,
            margin: "10% auto auto auto", justifyContent: "center", padding: "1%", fontWeight: "bold"}}>
            <p>Welcome to Di's Social Application or DiS! This is a team project for class M151 of the
                department's Computer Science Master program.</p>
            <p>Group Project by Anna Kavvada & Fotis Memis</p>
            <IconButton href={"https://github.com/fotis120/DiSocialApp"} aria-label="add to favorites">
                <GitHubIcon color={"secondary"}/>
            </IconButton>
        </Container>
    );
}
