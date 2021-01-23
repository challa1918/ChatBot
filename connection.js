
var express = require("express")
var Mongoclient=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/"
var app = express()
var Users = require("./schema/user");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb",{useUnifiedTopology:true,useNewUrlParser:true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");   
    });
    app.get("/user", (req, res) => {
        res.sendFile(__dirname + "/search.html");   
        });

app.post("/getuser",(req,res)=>{
    console.log("Search User "+req.body.phnno);

    Users.find({phnno:req.body.phnno},(err, results)=>{
          if (err) return console.log(err)
          console.log(results)
          

    });   
 
});

app.post("/insert", (req, res) => {   
    var myData = new Users(req.body);
    myData.save()
    .then(item => {
       console.log("User added added!! "+req.body.phnno);
   
    })
    .catch(err => {
    res.status(400).send("unable to save to database "+err);
    });

   });




app.listen(3036)