import { Router } from "express";
import { createPost, getPost } from "../controllers/posts.controller";

const router = Router()
router.route('/create-post').post(createPost)
router.route('/get-post').get(getPost)
export default router