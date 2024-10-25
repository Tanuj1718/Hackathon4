import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import generateTokens from "../utils/generateTokens.js";
dotenv.config({
    path: "./.env"
})

const jwtKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY


const Signup = async (req, res) => {
    try {
        console.log("Received")
        const { name, email, password, gender, country} = req.body;
        console.log(name+email+password+country)

        if (!name || !email || !gender || !password || !country) {
            console.log(name + email + password);
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email,
            country,
            gender,
            password: hashedPassword,
        });

        console.log(newUser);

        res.status(200).json({
            name: newUser.name,
            email: newUser.email
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};


const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const {accessToken, refreshToken, accessTokenExp, refreshTokenExp} = await generateTokens(user)

        //set cookies
        setTokenCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp)

        res.status(200).json({
            name: user.name,
            email: user.email,
            message: "Login Successful",
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_exp: accessTokenExp
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export {Signup, Signin}