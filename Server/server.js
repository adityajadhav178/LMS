import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./Configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./Controllers/webhooks.js";
import educatorRouter from "./Routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./Configs/cloudinary.js";
import courseRouter from "./Routes/courseRoute.js";
import userRouter from "./Routes/userRoute.js";

const app = express();

//Connect to db
await connectDB();
await connectCloudinary();

//Middlewares
app.use(cors());
app.use(clerkMiddleware());

//Routes
app.get('/', (req, res) => res.send("API Warning"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.use('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})