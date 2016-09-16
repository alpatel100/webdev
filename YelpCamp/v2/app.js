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
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Gold basin", 
//     image: "http://www.photosforclass.com/download/6037471056"
//   }, function(err, campground){
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
    res.render("campgrounds", {campgrounds: campgrounds});
  });
  
});


app.post("/campgrounds", function(req, res) {
  
var camp = new Campground({
  name : req.body.name,
  image : req.body.image
});

  camp.save(function(err, campgrounds){
    if (err) return console.error(err);
       res.redirect("campgrounds");
  });
 
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("YelpCamp server started !!");
});

// app.listen(3000, function() {
//   console.log("YelpCamp server started !!");
// })


// For sample Data
// var campgrounds = [
//   { name: "Grand canyon", image: "http://www.photosforclass.com/download/493046463"},
//   { name: "Gold basin", image: "http://www.photosforclass.com/download/6037471056"},
//   { name: "Nevada BLM", image: "http://www.photosforclass.com/download/30054072" },
//   { name: "Aspen Glen", image: "http://www.photosforclass.com/download/9570546243" },
//   { name: "Dry Arena", image: "http://www.photosforclass.com/download/8137270056" },
//   { name: "Arizone desert", image: "http://www.photosforclass.com/download/26733188111" }
//   ];
  