const express=require('express');
const bodyparser=require('body-parser');
const _=require('lodash');
const mongoose=require("mongoose");

var app=express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true,useUnifiedTopology:true});

const postSchema={
  title:String,
  content:String,
};
const Post=mongoose.model("Post",postSchema);


const head1="Welcome to our blog page. Here you can see others posts as well as enter your own posts.";
const head2="About us, Here you can get all the information about us";
const head3="You can contact us at 218787432";


app.get('/',function(req,res){
  Post.find({},function(err,posts){
    if(!err){
    res.render('home',{
      heading1:head1,
      p:posts,
    });
  }
  })

});

app.get('/about',function(req,res){

  res.render('about',{
    aboutheading:head2,
  })
});
app.get('/contact',function(req,res){

  res.render('contact',{
    contactheading:head3,
  })
});

app.get('/posts',function(req,res){
  res.render('posts');
});

app.post("/posts",function(req,res){

  // posts.push(post);
  // res.redirect("/");

  const post=new Post({
    title:req.body.title,
    content:req.body.desc,
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  var extra=req.params.postId;
  console.log(extra);

  Post.findOne({_id:extra},function(err,post){
    res.render("random",{
      title:post.title,
      desc:post.content,
    })
  })
})

app.listen(3000,function(){
  console.log('Server Started');
})
