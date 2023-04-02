const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname +"/date.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistdb", {
  useNewUrlParser: true,
});

const app = express();

const items = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

function getItems() {
  const Items = Item.find({});
  return Items;
}

app.get("/", function (req, res) {
  // const day = date.getDate();
  getItems().then(function (result) {
    if (result.length === 0) {
      res.render("list",  { listTitle: "Today", newListItems: items });
    } else {
      res.render("list",  { listTitle: "Today", newListItems: result });
    }
  });
});


app.post("/", function (req, res) {
const itemName = req.body.nextItem;
const item = new Item({
  name : itemName
})
item.save();
res.redirect("/")
});


app.post("/delete", function(req, res){
  const checkedItem = req.body.check;
  Item.findByIdAndRemove(checkedItem, function(err){
    if(!err){
      console.log("deleted");
    }
  })
  res.redirect("/")
})

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
