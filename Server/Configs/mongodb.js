import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',() => console.log("Databse Connected"))
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;