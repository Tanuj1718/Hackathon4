import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})



const corsOptions = {
  origin: '*', //use your frontend url
  credentials: true,
  optionsSuccessStatus: 200,
};

//common middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())


//import routes
import signupRouter from "./routes/signup.route.js"
import signinRouter from "./routes/signin.route.js"
import createPostRouter from "./routes/posts.route.js"
app.use('/user', signupRouter)
app.use('/user', signinRouter)
app.use('/user', createPostRouter)
export {app}