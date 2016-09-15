var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temper: String
});

var Cat = mongoose.model("Cat", catSchema);

// add new cat
// var george = new Cat({
//     name: "Mae",
//     age: 11,
//     temper: "Nice"
// });

// george.save(function(err, cat) {
//   if(err){
//       console.log("Something went wrong!!");
//   } 
//   else {
//       console.log("We just saved a cal!!");
//       console.log(cat);
//   }
// });

// Create is New + save for new entries
// Cat.create({
//     name: "Snow",
//     age: 8,
//     temper: "Warm"
// }, function(err, cat){
//   if(err){
//       console.log("error again");
//   }  
//   else {
//       console.log("Saved another one...");
//       console.log(cat);
//   }
// });

// retrive cat
Cat.find({}, function(err, cats){
   if(err){
       console.log("Ohh Error!!")
   } 
   else {
       console.log("Showing All CATs!!");
       console.log(cats);
   }
});