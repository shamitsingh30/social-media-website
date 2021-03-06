const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

    try{
        //populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('likes')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            },
            options: { sort: { 'createdAt': -1 } }
        });

        let users = await User.find({});


        // console.log(posts[1]);
        return res.render('home', {
            title: 'Codeial',
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log('Error', err);
    }
    
    
}