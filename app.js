require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const port= process.env.PORT || 8080;
const Contact = require("./models/Schema");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.get("/", (req,res)=>{
    let success = req.query.success;
    res.render("Listings/home.ejs",{success});
});

app.get("/about",(req,res)=>{
    res.render("Listings/About");
});

app.get("/skills",(req,res)=>{
    res.render("Listings/skills");
});

app.get("/project",(req,res)=>{
    res.render("Listings/project");
});

app.get("/contact",(req,res)=>{
    res.render("Listings/Contacts");
});


app.post("/contact", async(req,res)=>{
    try{
        const {name,email,message} = req.body;
        const userData = new Contact({
            name,
            email,
            message
        });
        await userData.save();
        console.log("Saved Data:", userData);
        res.redirect("/?success=true");
    }catch(err){
        console.log("Error:",err);
        res.redirect(err.message);
    }
});


app.listen(port, ()=>{
    console.log("Server Activated on port 8080");
});
