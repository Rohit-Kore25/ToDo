//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const date = require(__dirname + "/date.js");        just for simplicity kara h

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

//connecting to the database
mongoose.connect("mongodb+srv://rohit1425:Zoya%401425@cluster0.2blvw.mongodb.net/todolistDB");

//creating a schema:
const itemSchema = new mongoose.Schema({
  name:String
});

//making the collection according to Schema
const item = mongoose.model('Item',itemSchema);

//inserting some default values:
const item1 = new item({
  name:"Welcome to your todolist!"
});

const item2 = new item({
  name:"Hit the + button to add a new item"
});

const item3 = new item({
  name:"<-- Hit this button to remove an item"
});

const defaultItems = [item1,item2,item3];

app.get("/", function(req, res) {


item.find({},function(err,items){

  if(items.length === 0){

    item.insertMany(defaultItems,function(err){

      console.log("Stored default items!");

    });

    res.redirect("/");

  }else{
    res.render("list", {listTitle: "Today", newListItems: items});
  }
});


});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const itemtobeadded = new item({
    name:itemName
  });

  itemtobeadded.save();
  res.redirect("/");

});

app.post("/delete",function(req,res){
  const checkItemID = req.body.checkbox;

  item.deleteOne({_id:checkItemID},function(err){
    res.redirect("/");
  });
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
