import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./Configs/mongodb.js";
import { clerkWebhooks } from "./Controllers/webhooks.js";

const app = express();

//Connect to db
await connectDB()

//Middlewares
app.use(cors());

//Routes
app.get('/', (req, res) => res.send("API Warning"))
app.post('/clerk', express.json(), clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})