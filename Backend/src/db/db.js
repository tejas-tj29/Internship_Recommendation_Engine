import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("");
        console.log(`MongoDB Connected:"${conn.connection.host}`);
    }
    catch (error) {
        console.error("Error in connecting to MongoDB");
        process.exit(1);
    }
}
export default connectDB; 