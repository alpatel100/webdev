var bodyParser = require("body-parser"),  // to parse the incoming form data from body to object
    express = require("express"),
    mongoose = require("mongoose"),
    app = express();

mongoose.connect("mongodb://localhost:/blog_app");

// APP Config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");  // use ejs extention for all embedded js file in /views directory
app.use(express.static("public"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} 
});

// mongoose/MODEL config
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://source.unsplash.com/random",
//     body: "Hello This is a Blog post!"
// });

// ROOT Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// RESTFUL Routes
app.get("/blogs", function(req, res){
    
    Blog.find({}, function(err, blogs){
        if (err) return console.error(err);
        res.render("index", {blogs: blogs});    
    })
});

// RESTFUL Routes - NEW
app.get("/blogs/new", function(req, res){
    
    res.render("new");    
});

app.post("/blogs", function(req, res){
    var formData = req.body.blog;
    
    Blog.create(formData, function (err, newBlog) {
  if (err) return console.error(err);
  console.log("New Blog created in database");
  res.redirect("/blogs");
});

    // console.log(formData);
    
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server started !!");
});