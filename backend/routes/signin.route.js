import { Router } from "express";
import {Signin} from "../controllers/auth.controller.js";

const router = Router()
router.route('/signin').post(Signin)
export default router