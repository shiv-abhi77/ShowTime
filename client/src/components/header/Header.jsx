import { AppBar, Toolbar, Typography, styled, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

const HeaderBox = styled(AppBar)`
    background : rgb(3,37,65);
`
const AppTitle = styled(Typography)`
    font-size: 45px;
    margin-left: 60px;
    background: rgb(202,245,126);
    font-family: 'Belanosima', sans-serif;
    background: linear-gradient(90deg, rgba(202,245,126,1) 0%, rgba(116,250,162,1) 34%, rgba(5,255,198,1) 55%, rgba(0,237,255,1) 74%);
    -webkit-background-clip: text;
            background-clip: text;
    -webkit-text-fill-color: transparent;
`
const NavRight = styled(Box)`
    display:flex;
    flex-direction : row;
    width:fit-content;
    position:absolute;
    right:60px;
    flex : 1;
`
const NavRightContent = styled(Typography)`
    margin-right : 30px;
    font-size: 18px;
    font-family: 'Roboto Condensed', sans-serif;

`
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {account}=useContext(DataContext);
    console.log(account)
    return (
        <HeaderBox>
            <Toolbar>
                <AppTitle onClick={() => { if(location.pathname !== '/') navigate('/')}} style = {{cursor :'pointer'}}>MovieVerse</AppTitle>
                <NavRight>
                <NavRightContent onClick={() => { if(location.pathname.includes('explore') === false) navigate('/explore')}} style={{cursor:'pointer'}} >Explore</NavRightContent>
                {
                    account && account.loggedIn === true ? <NavRightContent onClick={() => { if(location.pathname.includes('library') === false) navigate('/library')}} style = {{cursor :'pointer'}} >Library</NavRightContent>
                    :
                    <NavRightContent onClick={() => { if(location.pathname.includes('login') === false) navigate('/login')}} style = {{cursor :'pointer'}} >Login</NavRightContent>
                }
                
                <NavRightContent onClick={() => { if(location.pathname.includes('search') === false) navigate('/search?query=')}} style = {{cursor :'pointer'}}>Search</NavRightContent>
                </NavRight>
            </Toolbar>
        </HeaderBox>
    )
}
export default Header;