import Review from "./Review";
import { Box, Grid, autocompleteClasses } from "@mui/material";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Link, useParams } from "react-router-dom";
let reviewList = [];


const ReviewItems = () => {
    const {id} = useParams();
    const [reviews, setReviews] = useState(reviewList);

        useEffect(() => {
            const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Y3OGI0MjZhNDA2NzVkOGE2NTg0NjBkM2Y2NzhjYiIsIm5iZiI6MTcyNjA4MDkwOC4zNDgxNjksInN1YiI6IjY2ZTFlNmVkMWQ3NTJiYmY0MzdjNDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XADYBtqAjdWWqmI9rHeMTNc6Jr8ETda-ASaczybLIp0'
            }
            };
            fetch(url, options)
            .then(res => res.json())
            .then(json => {
                reviewList = json.results.map(({author_details, content, created_at}) => {
                    if(author_details.avatar_path === null){
                        author_details.avatar_path = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }else if(author_details.avatar_path.includes('secure.gravatar.com')){
                        author_details.avatar_path = author_details.avatar_path.slice(1);
                    }else{
                        author_details.avatar_path = `https://image.tmdb.org/t/p/w500${author_details.avatar_path}`
                    }
                    return {name:author_details.username, imageSrc:author_details.avatar_path, content:content, date:created_at}
                

                })
                setReviews(reviewList);
        })
            .catch(err => console.error('error:' + err))
        },[])



    return(
        <>
        <div  style = {{display: 'flex',
            flexDirection:'column',
            marginLeft:'70px', 
            marginRight:'60px',
            marginTop:'10px',
            
            }}
            >
        {
            reviews && reviews.length > 0 ? reviews.map(review =>(
                        <Review  review  = {review}/>
            ))
    :
            <Box style={{ color:'#878787', margin:'30px 80px', fontSize:18 }}>No data available to display</Box>
            
    }
        </div>
        </>
    )
}

export default ReviewItems