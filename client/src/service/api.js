///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///REFER TO OFFICIAL AXIOS DOCUMENTATION FOR THE USAGE OF THE FUNCTIONS DEFINED BELOW
//https://axios-http.com/
///////////////////////////////////////////////////////////////////////////////////////
//THE DATA OF THE REQUEST WILL COME IN BODY FIELD OF REQUEST AND THE DATA CONTAINED IN RESPONSE WILL COME IN DATA OF RESPONSE



import axios from 'axios'
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
import { getAccessToken ,getType } from '../utils/common-utils.js';
const API_URL='https://showtime-2.onrender.com';

const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers: {
        "Accept": "application/json, form-data", 
       
    }
   
})

axiosInstance.interceptors.request.use(  //for this refer doc of https://axios-http.com/docs/interceptors
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(  //for this refer doc of https://axios-http.com/docs/interceptors
    function(response){
        //Stop global loader here
        return processResponse(response)
    },
    function(error){
        //Stop global loader here
        return Promise.reject(processError(error))
    }
)
/////////////////////////////
//If Success -> return { isSuccess : true , data : Object }
//If Fail -> return { isFailure : true , status : String , msg: String , code: int}
/////////////////////////////
const processResponse=(response)=>{
    if(response?.status === 200) {
        return { isSuccess : true , data : response.data }
    }
    else{
        return{
            isFailure : true , 
            status : response?.status , 
            msg: response?.msg ,
            code: response?.code
            
        }
    }
}
// if your are having confusion about the above function then see the implementation of controller functions 
const processError=(error)=>{
    if(error.response){//this function will run if an error will have a response sent by server
        //Request successfully made and server responded with an error other than range 2.x.x
        console.log('ERROR IN RESPONSE :',error.toJSON())
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }
    else if(error.request){
        //Request made but didnt receieved any response(network problem,connectivity issues)
        //here we put the code as empty string,because we dont really get any response,our request fails already
        console.log('ERROR IN REQUEST :',error.toJSON())
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:''
        }
    }
    else{
        //Something bad happened in setting up the request that triggered the error
        console.log('ERROR IN NETWORK :',error.toJSON())
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:''
        }
    }
}
const API={}
for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress)=>
    axiosInstance({
        method:value.method,
        url:value.url,
        data: value.method==='DELETE' ? {}: body,
        responseType:value.responseType,
        headers : {
            authorization : getAccessToken()
        },
        TYPE: getType(value, body),

        onUploadProgress: function(progressEvent) {
            if(showUploadProgress){
                let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                showUploadProgress(percentageCompleted);
            }

        },
        onDownloadProgress: function (progressEvent) {
            if(showDownloadProgress) {
                let percentageCompleted=Math.round((progressEvent.loaded * 100) / progressEvent.total)
                showDownloadProgress(percentageCompleted);
            }
        }
    
    })
}

export {API}