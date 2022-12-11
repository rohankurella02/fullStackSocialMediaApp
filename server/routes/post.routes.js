const { request } = require('express');
const exp = require('express');
const { Db, ObjectID } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const expressAsyncHandler = require('express-async-handler');
const postApp = exp.Router();

postApp.use(exp.json())

postApp.get('/test', (req, res) => {
    res.send("This API is Working correctly")
})

//Route for getting all the posts
postApp.get('/get', expressAsyncHandler(async (req, res) => {
    let postCollection = req.app.get('postCollection')
    // console.log(postCollection)
    let post = await postCollection.find().toArray();
    res.send(post);
}))

//route for updating like count
postApp.patch('/updateLikeCount/:id', expressAsyncHandler(async (req, res) => {
    let postCollection = req.app.get('postCollection')
    console.log(req.params.id)
    if(ObjectId.isValid(req.params.id)){
        let post = await postCollection.findOne({_id: ObjectId(req.params.id)})
        console.log(post)
        if(post){
            let updatedPost = await postCollection.updateOne({_id: ObjectId(req.params.id)}, {$set: {likeCounter: post.likeCounter + 1}})
            res.send({message: "Like Count Updated"})
        }else{
            res.status(404).send({message: "Post Not Found"})
        }
    }else{
        res.status(404).send({message: "Invalid Post ID"})
    }
}))

//route for creating a post
postApp.post('/create', expressAsyncHandler(async (req, res) => {
    let postCollection = req.app.get('postCollection');
    
    let post = req.body;
    // console.log(post)
    let result = await postCollection.insertOne(post);
    res.send({message: "Post Created Successfully", post: result})

}))

//route for deleting a post
postApp.delete('/delete/:id', expressAsyncHandler(async (req, res) => {
    let postCollection = req.app.get('postCollection');
    if(ObjectId.isValid(req.params.id)){
        let post = await postCollection.findOne({_id: ObjectId(req.params.id)})
        if(post){
            let result = await postCollection.deleteOne({_id: ObjectId(req.params.id)})
            res.send({message: "Post Deleted Successfully"})
        }else{
            res.status(404).send({message: "Post Not Found"})
        }
    }else{
        res.status(404).send({message: "Invalid Post ID"})
    }
}))

module.exports = postApp