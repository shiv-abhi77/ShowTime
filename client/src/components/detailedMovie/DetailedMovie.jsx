import { useNavigate, useParams, Link } from 'react-router-dom'
import { styled } from '@mui/material'
import { useState } from 'react';
import {Box, Typography} from '@mui/material'
import { useEffect, useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CastList from './castItems/CastList';
import ReviewItems from './reviewItems/ReviewItems';
import VideosList from './videoList/VideosList';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
const BigContainer = styled(Box)`
    padding-top: 30px;
    padding-bottom:30px;
    padding-left: 80px;
    padding-right: 60px;
    display :flex;
    flex-direction:row;
    background-size: cover;

`

const ImageContainer = styled(Box)`
    display: block;
    min-width: 300px;
    width: 300px;
    height: 450px;
    position: relative;
    top: 0;
    left: 0;
`
const DetailBox = styled(Box)`
    display: flex;
    flex-direction:column;
    padding-left: 40px;
    justify-content:center;
    
`
const TitleAndDateBox = styled(Box)`
    width: 100%;
    margin-top:10px;
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    display: flex;
`
const RatingAndAddBox = styled(Box)`
    display: flex;
    flex-direction:row;
    margin-bottom: 24px;
`
const OverviewBox = styled(Box)`
    display: flex;
    flex-direction:column;
    margin-bottom: 24px;
`
const DirectorBox = styled(Box)`
    display: flex;
    flex-direction:column;
`
const ListHeading = styled(Box)`
    margin-left:77px;
    margin-top:28px;
    font-size: 1.5em;
    font-weight: 600;
`
const intialBanneerObj = {
    poster_path:'',
    backdrop_path:'',
    original_title:'',
    overview:'',
    release_date:'',
    runtime:0,
    vote_average:0.0,
    genres:[],
    
}
const favColor  = {
    color : '#fff',
}
let bannerObj ={};
let crew = [];
let genreString = '';
let directorString = '';
const DetailedMovie = () => {
    const navigate  = useNavigate();
    const [favIconColor, setFavIconColor] = useState('#fff');
    const [watchIconColor, setWatchIconColor] = useState('#fff');
    const {setAccount} = useContext(DataContext);
    const {account}=useContext(DataContext);
    const {id} = useParams();
    const [bannerDetails, setBannerDetails] = useState(intialBanneerObj);
    const obj = {
        userId:account.id,
        movieId:id
      }
    const handleAddWatch = async(e) => {
        if(account.loggedIn === true){
            let response  = await API.addWatchLater(obj);
            
            if(response.isSuccess){
            console.log('Added to watchlater')
            setWatchIconColor('rgb(176, 5, 238)')
            }else{
            console.log('cant add to watch later')
            }
        }
        else{
            navigate('/login')
        }
    }

    const handleAddFav = async(e) => {
        if(account.loggedIn === true){
        let response  = await API.markFavorite(obj);
        if(response.isSuccess){
        console.log('Added to favorite')
        setFavIconColor('rgb(176, 5, 238)')
        }else{
        console.log('cant add to favorite')
        }
    }
    else{
        navigate('/login')
    }
}
    useEffect(() => {
        const urlMovie = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const optionsMovie = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Y3OGI0MjZhNDA2NzVkOGE2NTg0NjBkM2Y2NzhjYiIsIm5iZiI6MTcyNjA4MDkwOC4zNDgxNjksInN1YiI6IjY2ZTFlNmVkMWQ3NTJiYmY0MzdjNDE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XADYBtqAjdWWqmI9rHeMTNc6Jr8ETda-ASaczybLIp0'
        }
        };

        fetch(urlMovie, optionsMovie)
        .then(res => res.json())
        .then(json => {
                bannerObj = {poster_path: "https://image.tmdb.org/t/p/w500" + json.poster_path,
                backdrop_path: "https://image.tmdb.org/t/p/w500" + json.backdrop_path,
                original_title: json.original_title,
                overview: json.overview,
                release_date: json.release_date,
                runtime: json.runtime,
                vote_average : json.vote_average.toFixed(1),
                genres: json.genres.map(({name}) => {return {name:name}}),}
                let count = 0;
                genreString = '';
                bannerObj.genres.forEach(function (genre){
                    let x = genre.name;
                    if(count === 0){
                        genreString +=x;
                    }else
                    genreString += ', '+x;
                    count++;
                })
            setBannerDetails(bannerObj);
        })
        .catch(err => console.error('error:' + err));

        const urlCredits = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
        const optionsCredits = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTI5MTRjZjNlNDc2ZWNjNDVjMzU5ZDQwN2NhYmEwYiIsInN1YiI6IjY0OTM0ZmQwOWEzNThkMDBjNTk1ZmY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18srMUd5KoumpgOwzSmsRzbXT3StAk7i5uazf_J8Vds'
        }
        };

        fetch(urlCredits, optionsCredits)
        .then(res => res.json())
        .then(json => {
                crew = json.crew.map(({known_for_department, name}) => {return {job:known_for_department,name:name}})
                let count = 0;
                directorString = '';
                crew.forEach(function (item){
                    let x = item.name;
                    if(item.job === 'Directing'){
                    if(count === 0){
                        directorString +=x;
                    }else{
                    directorString += ', '+x;
                    }
                    count++;
                }
                })
        })
        .catch(err => console.error('error:' + err));


    }, [])


    return(
        <>
    <BigContainer style={{backgroundImage:`linear-gradient(90deg, rgba(3,24,41,1) 10%, rgba(3,24,41,0.6) 100%), url(${bannerDetails.backdrop_path})`,
        }}>
        <ImageContainer>
        <img src={bannerDetails.poster_path}alt="Movie Poster" style={{
            display: 'block',     
            width: '100%',
            minWidth: '100%',
            height: '100%',
            minHeight: '100%',
            borderWidth: '0px',
            outline: 'none' ,
            borderRadius:'10px'
            }} />
        </ImageContainer>
        <DetailBox>
            <TitleAndDateBox>
                <Typography style={{fontSize:'2.2rem', width:'100%', margin:0,padding:0, fontWeight:700, color:'#fff'}}>{bannerDetails.original_title}</Typography>
                <Box style = {{display:'flex', flexDirection:'row'}}>
                    <Typography style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>{bannerDetails.release_date}</Typography>
                    <Typography style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>||</Typography>
                    <Typography style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>{genreString}</Typography>
                    <Typography style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>||</Typography>
                    <Typography style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>{`${Math.floor(bannerDetails.runtime / 60)}h ${bannerDetails.runtime % 60}m`}</Typography>
                </Box>
            </TitleAndDateBox>

            <RatingAndAddBox>
                    <Box style={{
                    
                        padding:8,
                        background:'rgba(3,37,65,1)',
                        borderRadius:'24px',
                        marginRight:'20px',
                        cursor:'pointer'
                    }}>
                        <Typography style={{color: 'rgb(0 255 135)',fontSize:'1.5em',}}>{bannerDetails.vote_average}</Typography>
                        
                    </Box>
                    <FavoriteIcon style={{fontSize:'16', color:`${favIconColor}`, background:'rgba(3,37,65,1)', borderRadius:'24px', padding:'18' ,marginRight:'20px', cursor:'pointer'}} onClick = {(e) => handleAddFav(e)}/>
                    <BookmarkIcon style={{fontSize:'16', color:`${watchIconColor}`, background:'rgba(3,37,65,1)', borderRadius:'24px', padding:'18',marginRight:'20px', cursor:'pointer'}} onClick = {(e) => handleAddWatch(e)}/>
            </RatingAndAddBox>
            
            <OverviewBox>
                    <Typography  style={{fontSize:'1.3rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`,fontWeight:700}}>Overview</Typography>
                    <Typography  style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>{bannerDetails.overview}</Typography>
            </OverviewBox>
            <DirectorBox>
                    <Typography  style={{fontSize:'1.3rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`,fontWeight:700}}>Director</Typography>
                    <Typography  style={{fontSize:'1rem', marginRight:10,padding:0, color:'#fff', fontFamily: `'Roboto', sans-serif`}}>{directorString}</Typography>
            </DirectorBox>


        </DetailBox>
        
    </BigContainer>
    <ListHeading>
    Cast
    </ListHeading>
    <CastList/>
    <ListHeading>
    Videos and trailers
    </ListHeading>
    <VideosList style= {{marginLeft:'70px'}}/>
    <ListHeading>
    Reviews
    </ListHeading>
    <ReviewItems/>
    </>
    )
}
export default DetailedMovie;