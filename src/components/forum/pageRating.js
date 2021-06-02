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


    const handlePageRating = (rating) => {
        console.log("post reaction");
        ForumService.postPageRating(username, pageId, pageTitle, rating).then(response => response.status);
    }



    const render = () =>{
        if(showRating){
            if(currentRating === 0){
                return(
                    <div>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(1)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(2)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(3)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(4)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(5)}/>
                        </IconButton>
                    </div>
                )
            }
            else if(currentRating === 1){
                return(
                    <div>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(1)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(2)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(3)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(4)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(5)}/>
                        </IconButton>
                    </div>
                )
            }else if(currentRating === 2){
                return(
                    <div>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(1)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(2)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(3)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(4)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(5)}/>
                        </IconButton>
                    </div>
                )
            }else if(currentRating === 3){
                return(
                    <div>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(1)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(2)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(3)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(4)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(5)}/>
                        </IconButton>
                    </div>
                )
            }else if(currentRating === 4){
                return(
                    <div>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(1)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(2)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(3)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(4)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gray'}} onClick={handlePageRating(5)}/>
                        </IconButton>
                    </div>
                )
            }else if(currentRating === 5){
                return(
                    <div>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(1)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(2)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(3)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(4)}/>
                        </IconButton>
                        <IconButton aria-label="page rating">
                            <StarOutlineIcon style={{color: 'gold'}} onClick={handlePageRating(5)}/>
                        </IconButton>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            {render()}
        </div>
    );

}