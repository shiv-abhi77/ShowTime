import React from "react";
import Banner from "../banner/Banner";
import { Box, styled } from "@mui/material";
import MovieItem from "./movieItems/MovieItem";
import MovieList from "./movieItems/MovieList";


const trending = 'trending';
const nowplaying = 'nowplaying';
const upcoming = 'upcoming';
const ListHeading = styled(Box)`
    margin-left:67px;
    margin-top:32px;
    font-size: 1.5em;
    font-weight: 600;
`


const Home  = () => {
    
    return (
        <>
        <Banner/>
        <ListHeading>
            Trending Now
        </ListHeading>
        <MovieList data = 'trending'/>
        <ListHeading>
            Now Playing
        </ListHeading>
        <MovieList data = 'nowplaying'/>
        <ListHeading>
            Upcoming Movies
        </ListHeading>
        <MovieList data = 'upcoming'/>
        </>
    )
}

export default Home;