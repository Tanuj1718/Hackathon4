import { DiscussionModel } from "../models/posts.model";
import { User } from "../models/user.model";


const createPost = async (req, res) =>{
    try {
        const {topic, title, description, resources, name} = req.body;
        if(!topic || !title || !description || !name){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = User.findOne({name});
        if(!user){
            return res.status(401).json({ message: 'Invalid name or User is not registered' });
        }
        const newPost = await DiscussionModel.create({
            topic,
            title,
            description,
            resources,
            name
        })
        console.log(newPost)

        res.status(200).json({
            name: user.name,
            message: "Post created successfully!"
        });
    } catch (error) {
        console.error('Error during creating a post:', error);
        res.status(500).json({ message: 'Server error while creating post' });
    }
}


const getPost = async (req, res)=>{
    const Posts = await DiscussionModel.find();
    if(!Posts){
        return res.status(401).json({message: "No data available"})
    }
    res.status(200).json(Posts)
}

export {createPost, getPost}