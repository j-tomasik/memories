import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

        //Function for home page to show all the photo posts from all users
export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        //this var is for number of posts per page
        const LIMIT = 4;
        //subtracts 1 to offset for zero indexing, page 1 had posts 0-3, page 2 posts 4-7, etc...
        const startIndex = (Number(page) - 1) * LIMIT;
        //gets the count of total posts from db
        const total = await PostMessage.countDocuments({});
        //sorts and then limits to num of posts per page, then skips to correct start idx for given page
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        //returns current page and num of pages for frontend state to display 
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//function to query the database for posts that match search criteria for either search string in title name or tag included in post's tags
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    
    try {
        const posts = await PostMessage.find({
            //using find() and $or to search for posts that satisfy at least one of the conditions
            $or: [

                //searches for posts where the 'title' field matches the searchQuery, using a case-insensitive regular expression
                { title: { $regex: searchQuery, $options: "i" } },
                
                //searches for posts where the 'tags' array contains any one of the tags provided in the search param
                //using a comma seperated string for multiple tags
                { tags: { $in: tags.split(",") } },
                ],
        });     
        
        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//function for grabbing a single post based in ID params
export const getPost = async (req, res) => {
        const { id } = req.params;
    

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

//Creating a new post, saving to db with time of creation and giving the post a creator id
export const createPost = async (req, res) => {
    const post = req.body;
    //crating new data model with information from the request send from frontend to backend
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save()
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


//Function for updating posts
export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;
    //error handling for when there is no post with the id from the search request
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //using and by and update, could look to optimize this later
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
    
}


//delete function
export const deletePost = async (req, res) => {
    const { id } = req.params;
    //error handling for invalid ID
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);
    //successful confirmation message
    res.json({ message: 'Post deleted successfully' });
}



export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' })

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => {id !== String(req.userId)});
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}


