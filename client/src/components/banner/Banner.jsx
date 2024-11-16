import React from 'react'
import { Box,Typography,styled } from '@mui/material';
import { useState } from 'react';


const Container=styled(Box)`
    background-image: linear-gradient(90deg, rgba(3,37,65,0.8) 0%, rgba(3,37,65,0) 100%), url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/5GISMqlRXMEyBrgEqyvhaMMuQmJ.jpg');
    background-size: cover;
    width:95%;
    margin:0px auto;
    height:42vh;
    display:flex;
    flex-direction:column;
`
const Heading=styled(Typography)`
    
    color:#FFFFFF;
    line-height:1;
    font-size: 3em;
    font-weight: 700;
    margin-left:40px;
    font-family: 'Roboto', sans-serif;
    margin-top:65px;
`
const SubHeading=styled(Typography)`
    font-size: 2em;
    font-weight: 600;
    color:white;
    margin-left:40px;
    margin-top:2px;
    font-family: 'Roboto', sans-serif;
`
const SearchParent = styled('div')({
    marginLeft:"30px",
    marginTop:"30px",
    
})
    

const SearchForm = styled('form')({
    marginTop: '10px',
    position: 'relative',
    top: 0,
    left: 0,
    border:"none"
})
const SearchInput = styled('input')({
    width:'95%',
    height: '46px',
    lineHeight: '46px',
    fontSize: "1.1em",
    color: "rgba(0,0,0,0.5)",
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
    background: "linear-gradient(90deg, rgba(30,213,169,1) 0%, rgba(1,180,228,1) 100%)",
    borderRadius: "30px",
    position: "absolute",
    top: 0,
    right: "30px",
    color: "#fff"
})
const Banner = () => {
    const [search, setSearch] = useState('');
    const onInputChange = (e) => {
        setSearch(e.target.value);
    }
  return (
    <Container>
        <Heading variant='h2'>Welcome.</Heading>
        <SubHeading>Millions of movies, genres to discover. Explore now.</SubHeading>
        <SearchParent >
            <SearchForm id='search-box' action='/search' method='get' acceptCharset='utf-8'>
                <label cursor = 'default' >
                    <SearchInput  id="inner_search_v4" name="query"  placeholder="Search for a movie, genre, etc...." onChange={(e) => {onInputChange(e)}} value = {search}/>
                </label>
                <SearchButton type="submit" value="Search" style={{cursor:'pointer'}}></SearchButton>
            </SearchForm>
        </SearchParent>
    </Container>
  )
};

export default Banner