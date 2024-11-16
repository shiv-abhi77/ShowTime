import express from "express";
import { addToFavoriteController, addWatchLaterController, getFavoriteController, getWatchLaterController, signupUserController } from "../controllers/user-controllers.js";
import { loginUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
const Router = express.Router();

Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.put('/addwatchlater' ,authenticateToken, addWatchLaterController);
Router.put('/markfavorite' ,authenticateToken, addToFavoriteController);
Router.get('/getwatchlater' ,authenticateToken, getWatchLaterController);
Router.get('/getfavorite' ,authenticateToken, getFavoriteController);
export default Router;