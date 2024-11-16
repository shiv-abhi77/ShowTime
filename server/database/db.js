import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const dbConnection = async (username, password) =>{
    const URL = `mongodb+srv://shivanshnagar7555:<${process.env.DB_PASSWORD}>@cluster0.xc9regk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    try {
        await mongoose.connect(URL);
        console.log("Database connected succesfully");
    } catch (error) {
        console.log("Error while connecting to database:", error);
    }
}
export default dbConnection;