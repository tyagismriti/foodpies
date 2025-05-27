const fs = require('fs');
const PostModel = require('../models/postModel')

const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().lean();
		return res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		return res.status(500).json({status: "error", message: error.message});
	}
}

const getPostByURI = async (req, res) => {
  const postURI = req?.params?.recipeURI; 
  const postTitle = postURI.split("-").join(" ");
  
  try {
    const post = await PostModel.findOne({ title: postTitle });
		return res.status(200).json(post);
  } catch (error) {
    console.log(error);
		return res.status(500).json({status: "error", message: error.message});
  }
}

const addPost = async (req, res) => {
	try {
    const post = req.body;
    const newPost = new PostModel(post);
    await newPost.save();
    return res.status(200).json(newPost);
	} catch (error) {
		console.error(error);
    return res.status(400).json({ error: error.message });
	}
}

const addPostsFromFile = async (req, res) => {
  try {
    fs.readFile(__dirname + "./../" + "post_list.json", "utf-8", async (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Unable to read posts");
        return;
      }
      const posts = JSON.parse(data);
      
      let mergedObject = [];
      for (let key in posts[0]) {
        if (posts[0].hasOwnProperty(key)) {
          mergedObject.push({[key]: posts[0][key]})
        }
      }
      
      const addedPosts = await PostModel.insertMany(mergedObject);
      res.status(200).json({ messages: `${addedPosts.length} posts added sucessfully!` });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
}

module.exports = { getPosts, getPostByURI, addPost, addPostsFromFile }