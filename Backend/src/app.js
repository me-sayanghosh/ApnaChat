const express = require('express');
const multer = require('multer');
const uploadfile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');



const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']); 


const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({storage: multer.memoryStorage()});



app.post('/create-post', upload.single('image'), async (req, res) => {

    console.log(req.body);
    console.log(req.file);

    const result = await uploadfile(req.file.buffer);
    
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption,
    })  

    return res.status(200).json({
        message: "Post created successfully",
        post,
    })

});


app.get('/posts', async (req, res) => {
    const posts = await postModel.find();
    return res.status(200).json({
        message: "Posts retrieved successfully",
        posts,
    })  

});

app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params;
    await postModel.findByIdAndDelete(id);
    return res.status(200).json({
        message: "Post deleted successfully",
    })

});



module.exports = app;



