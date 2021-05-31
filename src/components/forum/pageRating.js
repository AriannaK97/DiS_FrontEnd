import IconButton from "@material-ui/core/IconButton";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import React from "react";
import ForumService from "../../services/forum.service";

export default function PageRating(props) {
    const showRating = props.showRating;
    const username = props.username;
    const pageId = props.pageId;
    const pageTitle = props.pageTitle;
    const selectedThreadPath = props.selectedThreadPath;
    const currentRating = props.currentRating

    //todo: add page rating and username on thread posts

    const handlePageRating = (rating) => {
        // if(rating === 0){
        //     UserService.deletePostReaction(pageId, username).then(response => response.status);
        //     window.location.href = '/feed';
        // }else{
            console.log("post reaction");
            ForumService.postPageRating(username, pageId, pageTitle, rating).then(response => response.status);
            // window.location.href = '/forum'+selectedThreadPath;
        // }
    }


    const render = () =>{
        if(showRating){
            return (
                <div>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(1)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(2)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(3)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(4)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(5)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(6)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(7)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(8)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(9)}/>
                    </IconButton>
                    <IconButton aria-label="page rating">
                        <StarOutlineIcon style={{color: 'gray'}} onClick={()=>handlePageRating(10)}/>
                    </IconButton>
                </div>
            );
        }
    }

    return (
        <div>
            {render()}
        </div>
    );

}