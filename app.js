const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const { result } = require("lodash");
const { urlencoded } = require("express");
const { render } = require("express/lib/response");

//express app
const app = express();
//connect to mongodb
const dbURI =
  "mongodb+srv://vinayak:25JUL2001@nodetuts.1a8j5kt.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    //listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  //     res.send('<p>about page</p>');
  // res.sendFile('./views/about.html',{root:__dirname});
  res.render("about", { title: "about" });
});

//Blogs routes

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save().then((result)=>{
      res.redirect('/blogs');
    }).catch((err)=>{
       console.log(err);
    })
})

app.get('/blogs/:id',(req,res)=>{
  const id=req.params.id;
  Blog.findById(id).then((result)=>{
    res.render('details',{blog:result,title:'Blog Details'})
  }).catch((err)=>{
    console.log(err);
  })
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});


// app.get("/blogs/create", (req, res) => {
//   res.render("create", { title: "create" });
// });

// //redirects
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })

//404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html',{root:__dirname});
  res.status(404).render("404", { title: "error" });
})
