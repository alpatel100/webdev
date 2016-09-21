var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");  // use ejs extention for all embedded js file in /views directory
app.use(bodyParser.urlencoded({extended:true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// { name: "Grand canyon", 
// image: "http://www.photosforclass.com/download/493046463", 
// description: "This is the campground from Grand canyon. One of th emost beautiful place in the world to camp."}
// , function(err, campground){
//     if(err){
//       console.log("Error adding new Campground");
//     }
//     else {
//       console.log("Hoorey, New campground added in database!!");
//       console.log(campground);
//     }
//   });

// Campground.create(
// { name: "Gold basin", image: "http://www.photosforclass.com/download/6037471056", description: "This is the campground from Gold basin. One of th emost beautiful place in the world to camp."}
// , function(err, campground){
//     if(err){
//       console.log("Error adding new Campground");
//     }
//     else {
//       console.log("Hoorey, New campground added in database!!");
//       console.log(campground);
//     }
//   });
  
app.get("/", function(req, res) {
  res.render("landing");
});


app.get("/campgrounds", function(req, res) {
  
  Campground.find(function(err, campgrounds){
    if (err) return console.error(err);
    res.render("index", {campgrounds: campgrounds});
  });
  
});


app.post("/campgrounds", function(req, res) {
  
var camp = new Campground({
  name : req.body.name,
  image : req.body.image,
  description: req.body.description
});

  camp.save(function(err, campgrounds){
    if (err) return console.error(err);
       res.redirect("campgrounds");
  });
 
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
  // res.send("Show page");
  var id = req.params.id;
  
    Campground.findById(id,function(err, campground){
      if (err) return console.error(err);
      res.render("show", {campground: campground});
  });
  
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server started !!");
});

// app.listen(3000, function() {
//   console.log("YelpCamp server started !!");
// })


// For sample Data
// var campgrounds = [
//   { name: "Grand canyon", image: "http://www.photosforclass.com/download/493046463", description: "This is the campground from Grand canyon. One of th emost beautiful place in the world to camp."},
//   { name: "Gold basin", image: "http://www.photosforclass.com/download/6037471056", description: "This is the campground from Gold basin. One of th emost beautiful place in the world to camp."},
//   { name: "Nevada BLM", image: "http://www.photosforclass.com/download/30054072", description: "This is the campground from Nevada BLM. One of th emost beautiful place in the world to camp."},
//   { name: "Aspen Glen", image: "http://www.photosforclass.com/download/9570546243", description: "This is the campground from Aspen Glen. One of th emost beautiful place in the world to camp."},
//   { name: "Dry Arena", image: "http://www.photosforclass.com/download/8137270056", description: "This is the campground from Dry Arena. One of th emost beautiful place in the world to camp."},
//   { name: "Arizone desert", image: "http://www.photosforclass.com/download/26733188111", description: "This is the campground from Arizone desert. One of th emost beautiful place in the world to camp."}
//   ];
  