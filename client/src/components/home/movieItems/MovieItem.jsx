import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { DataContext } from '../../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../service/api';
const MovieName = styled(Typography)`
  margin-top: 1px;
  margin-left: 5px;
  font-weight: 700;
  color: #000;
  &:hover {
    color: rgb(1, 180, 228);
  }
`;


const MovieItem = ({movie}) => {
  const navigate = useNavigate();
  const {account}=useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const obj = {
    userId:account.id,
    movieId:movie.id
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navToLogin = () => {
    navigate('/login')
  }

  const handleWatchLater = async() => {
    let response  = await API.addWatchLater(obj);
    
    if(response.isSuccess){
      console.log('Added to watchlater')
    }else{
      console.log('cant add to watch later')
  }
  }
  const handleMarkFav = async() => {
    let response  = await API.markFavorite(obj);
    if(response.isSuccess){
      console.log('Added to favorite')
    }else{
      console.log('cant add to favorite')
  }
  }
  

  return (
    <>
    <Box style={{ position: 'relative', width: '150px', marginLeft:'20px'}} >
       <Link to={`/movie/${movie.id}`} style={{textDecoration:'none' , color:'inherit'}}>
          <img src={movie.imageSrc}alt="Movie Poster" style={{ height: '225px', width: '150px', borderRadius:'10px', cursor :'pointer' }} />
        </Link>
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          p: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Box style={{
            position: 'absolute',
            top:195,
            left:5,
            padding:3,
            background:'rgb(3 14 59)',
            borderRadius:'15px'
       }}>
      <Typography style={{color: 'rgb(0 255 135)',fontSize:'1em',}}>{movie.rating}</Typography>
       </Box>
       <Link to={`/movie/${movie.id}`} style={{textDecoration:'none' , color:'inherit' , cursor :'pointer'}}>
            <MovieName   >{movie.movieName}  </MovieName>
        </Link>
      <Typography variant="body2" color="textSecondary" style={{marginLeft:'5px'}} >{movie.releaseDate}</Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          {
            account && account.loggedIn === true?
            <MenuItem onClick={() => handleWatchLater()}>Add to watchlater</MenuItem>
            :
            <MenuItem onClick={() => navToLogin()}>Add to watchlater?Login first</MenuItem>
          }
          {
            account && account.loggedIn === true?
            <MenuItem onClick={() => handleMarkFav()}>Mark as favorite</MenuItem>
            :
            <MenuItem onClick={() => navToLogin()}>Mark as favorite?Login first</MenuItem>
          }
          
          
          
        
        
      </Menu>
    </Box>
    </>
  );
};

export default MovieItem ;