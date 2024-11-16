import React, { useEffect, useState } from "react";
import { styled, Box, Typography } from "@mui/material"
import fetch from "node-fetch";
import { Link, useSearchParams  } from "react-router-dom";
import MovieItem from "../home/movieItems/MovieItem";
import {Grid} from "@mui/material";
let genreList = [];
let movieList = [];
const SideBarContainer = styled(Box)`
    display:inline-block;
    width:290px;
    background:#242e34;
    max-height: 100vh;
    overflow-y: auto;
    position: fixed;
    
`
const ListSubHeading = styled(Typography)`
    color:#c6cbd3;
    font-size:13px;
    padding: 5px 5px 5px 15px;
    margin-top:20px;
`
const ListItem = styled(Link)`
    color:#fff;
    padding: 5px 5px 5px 15px;
    &:hover{
        background-color:#303b42;
    }
    cursor:pointer;
    border-radius:10px;
    text-decoration:none;
    margin-top:3px;
    font-size:18px;
    font-family: 'Roboto Condensed', sans-serif;
`
const MainContenBox = styled(Box)`
    position:absolute;
    top:70px;
    left:290px;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
`

const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Y3OGI0MjZhNDA2NzVkOGE2NTg0NjBkM2Y2NzhjYiIsIm5iZiI6MTcyNjA4MDkwOC4zNDgxNjksInN1YiI6IjY2ZTFlNmVkMWQ3NTJiYmY0MzdjNDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XADYBtqAjdWWqmI9rHeMTNc6Jr8ETda-ASaczybLIp0'
  }
};


const Explore = () => {
    console.log('started')
    const [genres, setGenres] = useState(genreList);
    const [movies, setMovies] = useState(movieList);

    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const genre = searchParams.get('genre');
    useEffect(() => {
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            genreList = json.genres.map(({id, name}) => { return {id:id, name:name}; })
            setGenres(genreList);
        })
        .catch(err => console.error('error:' + err));
        
    },[]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTI5MTRjZjNlNDc2ZWNjNDVjMzU5ZDQwN2NhYmEwYiIsInN1YiI6IjY0OTM0ZmQwOWEzNThkMDBjNTk1ZmY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18srMUd5KoumpgOwzSmsRzbXT3StAk7i5uazf_J8Vds'
        }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            movieList = json.results.map(({original_title, poster_path, release_date ,vote_average, id}) => { return {movieName : original_title, imageSrc: "https://image.tmdb.org/t/p/w500" + poster_path, releaseDate:release_date, rating : vote_average, id:id}});
            setMovies(movieList);
        })
        .catch(err => console.error('error:' + err));
    }, [type])

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTI5MTRjZjNlNDc2ZWNjNDVjMzU5ZDQwN2NhYmEwYiIsInN1YiI6IjY0OTM0ZmQwOWEzNThkMDBjNTk1ZmY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18srMUd5KoumpgOwzSmsRzbXT3StAk7i5uazf_J8Vds'
        }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            movieList = json.results.map(({original_title, poster_path, release_date ,vote_average, id}) => { return {movieName : original_title, imageSrc: "https://image.tmdb.org/t/p/w500" + poster_path, releaseDate:release_date, rating : vote_average, id:id}});
            setMovies(movieList);
        })
        .catch(err => console.error('error:' + err));
    }, [genre])


    return(
<>
    <SideBarContainer >
        <Box style = {{display:'flex', flexDirection:'column' }}>
        <ListSubHeading>Explore</ListSubHeading>
        <ListItem to = {`?type=now_playing`}>Now Playing</ListItem>
        <ListItem to = {`?type=popular`}  >Popular</ListItem>
        <ListItem to = {`?type=top_rated`}>Top Rated</ListItem>
        <ListItem to = {`?type=upcoming`}>Upcoming</ListItem>
        <ListSubHeading>Explore Genres</ListSubHeading>
        {
            genres && genres.length > 0 ? genres.map(genre => (
                <ListItem to = {`?genre=${genre.id}`}>{genre.name}</ListItem>
            ))
            :
             console.log('no genres available')        
        }
        </Box>
    </SideBarContainer>
    <MainContenBox>
        {
            movies && movies.length > 0 ? movies.map(movie => (
                        <MovieItem  movie = {movie}/>
            ))
            :
            console.log('no data to show')
        }
       
    </MainContenBox>

</>
    )
}

export default Explore;