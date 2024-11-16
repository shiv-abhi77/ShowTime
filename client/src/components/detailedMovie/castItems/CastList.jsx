import CastItem from "./CastItem";
import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
let castArray = [];
const CastList = () => {
    const {id} = useParams();
    const [casts, setCast] = useState(castArray);
    useEffect(() => {
        const urlCredits = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
        const optionsCredits = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Y3OGI0MjZhNDA2NzVkOGE2NTg0NjBkM2Y2NzhjYiIsIm5iZiI6MTcyNjA4MDkwOC4zNDgxNjksInN1YiI6IjY2ZTFlNmVkMWQ3NTJiYmY0MzdjNDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XADYBtqAjdWWqmI9rHeMTNc6Jr8ETda-ASaczybLIp0'
        }
        };

        fetch(urlCredits, optionsCredits)
        .then(res => res.json())
        .then(json => {
            castArray = json.cast.reduce(function(filtered,{known_for_department, name, profile_path, character}){ 
                if(known_for_department === 'Acting') {
                    
                    if(profile_path === null){
                        filtered.push({job:known_for_department,name:name, profile_path:"https://cdn-icons-png.flaticon.com/512/149/149071.png", character:character }); 
                        
                    }else{
                        filtered.push({job:known_for_department,name:name, profile_path:`https://image.tmdb.org/t/p/w500${profile_path}`, character:character }); 
                    }
                }
                return filtered;
        },[])
            console.log(castArray)
            setCast(castArray);
        })
        .catch(err => console.error('error:' + err))
    }, [])




    return(
        <>
        <div  style = {{display: 'flex',
            overflowX:'scroll',
            marginLeft:'60px', 
            marginRight:'60px',
            marginTop:'10px',
            }}
            >
        {
            casts && casts.length > 0 ? casts.map(cast => (
                        <CastItem  cast = {cast}/>
            )

        
    )
    :
            <Box style={{ color:'#878787', margin:'30px 80px', fontSize:18 }}>No data available to display</Box>
            
    }
        </div>
        
            </>
    )
}
export default CastList;