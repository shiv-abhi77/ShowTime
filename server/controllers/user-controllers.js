import User from "../model/user-schema.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
dotenv.config();
export const signupUserController = async(request, response) => {
    try {
    
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {username: request.body.username, password: hashedPassword};
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({msg:'signup successfull'})
    } catch (error) {
        return response.status(500).json({msg:'error while signup the user'});
    }
}

export const loginUserController = async(request, response) => {
    let user = await User.findOne({username : request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username does not exist'});
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
             const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn :'30m' });
             const refershToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
             const newToken = new token({token:refershToken});
             await newToken.save();
             return response.status(200).json({accessToken : accessToken, refershToken : refershToken, username : user.username, mongoId:user._id});
        }else{
            return response.status(400).json({msg:'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login user'});
    }
}

export const addWatchLaterController = async(request, response) => {
    
    try {
        let userId = request.body.userId;
        let movieId = request.body.movieId;

        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { watchlater: movieId  } }
        );
        return response.status(200).json({msg:"Added to watch later successfully"});
            
    } catch (error) {
        return response.status(500).json({msg:'error while adding to watchlater'});
    }
}
export const addToFavoriteController = async(request, response) => {
    try {
        let userId = request.body.userId;
        let movieId = request.body.movieId;
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { favorite: movieId  } }
        );
        
        return response.status(200).json({msg:"Added to favorite successfully"});
            
    } catch (error) {
        return response.status(500).json({msg:'error while adding to favorite'});
    }
}
export const getWatchLaterController = async(request, response) => {
    let userId = request.query.userId;
    let user = await User.findOne({ _id : userId});
    try {
        let movieIds = [];
        for(let i = 0;i<user.watchlater.length;i++){
            movieIds.push(user.watchlater[i]);
        }
        return response.status(200).json(movieIds);    
    } catch (error) {
        return response.status(500).json({msg:'error while getting watchlater'});
    }
}
export const getFavoriteController = async(request, response) => {
    let userId = request.query.userId;
    let user = await User.findOne({ _id : userId});
    try {
        let movieIds = [];
        for(let i = 0;i<user.favorite.length;i++){
            movieIds.push(user.favorite[i]);
        }
        
        return response.status(200).json(movieIds);    
    } catch (error) {
        return response.status(500).json({msg:'error while getting favorite'});
    }
}

