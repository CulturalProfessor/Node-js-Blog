const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const { result } = require("lodash");
const { urlencoded } = require("express");
const { render } = require("express/lib/response");
const blogRoutes=require('./routes/blogRoutes')

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
app.use('/blogs',blogRoutes);

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
