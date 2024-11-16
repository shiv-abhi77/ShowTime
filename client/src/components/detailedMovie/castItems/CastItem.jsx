import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material';

const CastName = styled(Typography)`
  margin-top: 1px;
  margin-left: 5px;
  font-weight: 700;
  color: #000;
//   &:hover {
//     color: rgb(1, 180, 228);
//   }
`;


const CastItem = ({cast}) => {
  
  return (
    <Box style={{ position: 'relative', width: 138, marginLeft:'20px', cursor :'pointer', border:'1px solid rgba(227,227,227,1)', borderRadius:'10px', paddingBottom: '10px',boxShadow : '5px 1px 5px 1px rgb(0 0 0.2/ 0.2)'}} >

      <img src={cast.profile_path}alt="Movie Poster" style={{ height: '175px', width: '138px', borderRadius:'10px' }} />

      
      <CastName>{cast.name}</CastName>
      <Typography   style={{marginLeft:'5px', fontWeight:300}} >{cast.character}</Typography>
    </Box>
  );
};

export default CastItem ;