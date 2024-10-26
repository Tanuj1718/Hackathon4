import { DiscussionModel } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import { AIContent } from "../utils/generateAIPost.js";
import { verifyPost } from "../utils/verifyPost.js";


const createPost = async (req, res) =>{
    try {
        const {topic, title, description, resources, name} = req.body;
        const user = await User.findOne({name});
        if(!user){
            return res.status(401).json({ message: 'Invalid name or User is not registered' });
        }
        //if user create post through AI
        if(topic && title && name && !description && !resources){

            try {

                const AiResponse = await AIContent(topic, title)
                const newPost = await DiscussionModel.create({
                    topic: AiResponse.topic,
                    title: AiResponse.title,
                    description: AiResponse.description,
                    name,
                    resources: AiResponse.resources
                })

                console.log(newPost)
                res.status(200).json({
                    message: "Post created successfully1"
                })
                return
            } catch (error) {
                console.error('Error creating response:', error);
                res.status(500).json({ error: 'An error occurred while creating the AI response' });
            }
        }

        if(!topic || !title || !description || !name){
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log(await verifyPost(topic, title, description))
        const verification = await verifyPost(topic, title, description)
        if(verification.analysis != 'YES'){
            return res.status(401).json({
                message: "Content is not valid"
            })
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
            message: "Post created successfully2!"
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