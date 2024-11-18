import React from 'react'
import { useState ,useContext} from 'react'
import {Box,Button,TextField,styled,Typography} from '@mui/material'
import { API } from '../../service/api.js'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'
const Component  = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')({
    width:150,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0'
})
const Wrapper = styled(Box)`
    padding : 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div, & > p, & > button{
        margin-top : 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform:none;
    background:black;
    color:#41ef1a;
    height:48px;
    border-radius:2px;
    &:hover{
        background-color:#41ef1a;
        color:black;
    }
    font-size:15px;
`
const SignupButton = styled(Button)`
    text-transform:none;
    background-color:black;
    color:#41ef1a;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0 / 20%);
    &:hover{
        background-color:#41ef1a;
        color:black;
    }
`
const Text = styled(Typography)`
    color:#878787;
    font-size:16px;

`
const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;

`
const loginIntialValues = {
    username : '',
    password : ''
}
const signupInitialValues  = {
    username : '',
    password : '',
}
const Login = ()=>{
    const imageUrl = 'data:image/jpeg;base64,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';
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginIntialValues);
    const [error, setError] = useState('');
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();
    const toggleSignup = () =>{
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name] : e.target.value});
    }
    const onValueChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value});
        console.log(login)
    }
    const signupUser = async() =>{
       let response =  await API.userSignup(signup);
       if(response.isSuccess){
        setSignup(signupInitialValues);
        toggleAccount('login');
       }else{
        setError('Something went wrong, please try again later');
       }
    }
    const loginUser = async() => {
        let response  = await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            
            setAccount({username : response.data.username, loggedIn:true, id:response.data.mongoId});
            
            navigate('/');
        }else{
            setError('Something went wrong, please try again later');
        }
    }
    return (
        <Component>
            <Image src = {imageUrl} alt = 'login'/>
            {
            account === 'login'?
            <Wrapper>
                <TextField variant = "standard" value = {login.username}label = "Enter Userame" onChange={(e) => onValueChange(e)} name='username'/>
                <TextField variant = "standard" value = {login.password}label = "Enter Password" onChange={(e) => onValueChange(e)} name='password'/>
                { error && <Error>{error}</Error> }
                
                <LoginButton onClick = {loginUser} variant = "contained">Login</LoginButton>
                <Typography style = {{textAlign : 'center'}}>OR</Typography>
                <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant = "standard" label = "Enter Userame" onChange={(e) => onInputChange(e)} name='username'/>
                <TextField variant = "standard" label = "Enter Password"onChange={(e) => onInputChange(e)} name='password'/>
                { error && <Error>{error}</Error> }
                <SignupButton onClick={signupUser}>Signup</SignupButton>
                <Typography style = {{textAlign : 'center'}}>OR</Typography>
                <LoginButton onClick={() => toggleSignup()} variant = "contained">Already have an account</LoginButton>
            </Wrapper>
}
        </Component>
    )
};
export default Login