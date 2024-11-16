import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Box, Typography, styled} from '@mui/material'
import { useSearchParams } from "react-router-dom";
import {Grid} from "@mui/material";
import MovieItem from "../home/movieItems/MovieItem";
const SearchParent = styled('div')({
    display:'block',
    margin:"80px",
    marginLeft:'400px'
    
})
    

const SearchForm = styled('form')({
    marginTop: '10px',
    border:"none"
})
const SearchInput = styled('input')({
    width:'50%',
    height: '46px',
    lineHeight: '46px',
    fontSize: "1.1em",
    color: "#fff",
    background:'rgba(3,35,67,1)',
    border: 'none',
    borderRadius: '30px',
    padding: "0px 20px",
    
})
const SearchButton = styled('input')({
    display: "inline-flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    height: "46px",
    padding: "10px 26px",
    border: "none",
    position:"relative",
    right:'40px',

    background: "linear-gradient(90deg, rgba(30,213,169,1) 0%, rgba(1,180,228,1) 100%)",
    borderRadius: "30px",
    
    top: 0,
    
    color: "#fff"
})
const MainContenBox = styled(Box)`
    position:absolute;
    top:170px;
    left:70px;
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    
`

let movieList = [];
const Search = () => {
    console.log('really')
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState(movieList);
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("query")
    
    const onInputChange = (e) => {
        setSearch(e.target.value);
    }
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchParams.get("query")}&include_adult=false&language=en-US&page=1`;
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
            movieList = json.results.map(({original_title, poster_path, release_date ,vote_average, id}) => {
                if(poster_path === null){
                    poster_path = "https://w7.pngwing.com/pngs/116/765/png-transparent-clapperboard-computer-icons-film-movie-poster-angle-text-logo-thumbnail.png"
            
                }else{
                    poster_path = "https://image.tmdb.org/t/p/w500" + poster_path;
                }
                vote_average = vote_average.toFixed(1)
                return {movieName : original_title, imageSrc:poster_path, releaseDate:release_date, rating : vote_average, id:id}
            });
            setMovies(movieList);
        })
        .catch(err => console.error('error:' + err));
    }, [searchParams])
    
    return (
        <>
        {
            console.log('return')
        }
        <SearchParent >
                <SearchForm id='search-box' action='/search' method='get' acceptCharset='utf-8'>
                    <label cursor = 'default' >
                        <SearchInput  id="inner_search_v4" name="query" onChange={(e) => {onInputChange(e)}}  placeholder="Search for a movie, genre, etc...." value = {search} />
                    </label>
                    <Link to = {`?query=${search}`} style={{textDecoration:'none' , color:'inherit'}}>
                        <SearchButton  type="submit" name="search" style={{cursor:'pointer'}}></SearchButton>
                    </Link>
                </SearchForm>
        </SearchParent>
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

export default Search;