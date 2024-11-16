import MovieItem from "./MovieItem";
import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";

let trendingMovies = [];








const MovieList = (props) => {
    
    const {account}=useContext(DataContext);
    const [movies, setMovies] = useState(trendingMovies);
    console.log(account)
    let url = '';
    
    if(props.data === 'trending'){
     url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    }else if(props.data === 'nowplaying'){
        url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    }else if(props.data === 'upcoming'){
        url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    }
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Y3OGI0MjZhNDA2NzVkOGE2NTg0NjBkM2Y2NzhjYiIsIm5iZiI6MTcyNjA4MDkwOC4zNDgxNjksInN1YiI6IjY2ZTFlNmVkMWQ3NTJiYmY0MzdjNDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XADYBtqAjdWWqmI9rHeMTNc6Jr8ETda-ASaczybLIp0'
        }
      };
      useEffect(() => {
        
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            trendingMovies = json.results.map(({original_title, poster_path, release_date ,vote_average, id}) => { return {movieName : original_title, imageSrc: "https://image.tmdb.org/t/p/w500" + poster_path, releaseDate:release_date, rating : vote_average, id:id}});
            setMovies(trendingMovies);
        }).catch(err => console.error('error:' + err));
    },[]);

    return (
        <>
        <div  style = {{display: 'flex',
            overflowX:'scroll',
            marginLeft:'50px', 
            marginRight:'60px',
            marginTop:'10px',
            
            }}
            >
        {
            movies && movies.length > 0 ? movies.map(movie => (
               
                        <MovieItem  movie = {movie}/>
                
    ))
    :
            <Box style={{ color:'#878787', margin:'30px 80px', fontSize:18 }}>No data available to display</Box>
            
    }
        </div>
        
            </>
    )
}

export default MovieList;