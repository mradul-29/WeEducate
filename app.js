const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/projectTest');
// }
const port = 3000;


var connectionUrl = "mongodb://localhost:27017/projectTest"
mongoose.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err) throw err
    console.log("Connected")
})

var db = mongoose.connection;

const contactSchema = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Email_Id: String,
    message: String,
    additional: String
});

const Contact = mongoose.model('Contact', contactSchema);

const feedbackSchema = new mongoose.Schema({
        Name: String,
        Email_Id: String,
        Feedback: String,
      });

const Feedback = mongoose.model('Feedback', feedbackSchema);

const registerSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique:true
    },
    password: String,
    confirmpassword: String
});

const Register = mongoose.model('Register', registerSchema);

const loginSchema = new mongoose.Schema({

    email: String,
    password: String
});

const Login = mongoose.model('Register', registerSchema);


// serve your css as static
app.use(express.static(__dirname));
app.use(express.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/login.html", (req, res)=>{
    res.sendFile(__dirname + "/login.html");
})


app.get("/subjects/computer_courses.html", (req, res)=>{
    res.sendFile(__dirname + "/subjects/computer_courses.html");
})
app.get("/subjects/comp_exams.html", (req, res)=>{
    res.sendFile(__dirname + "/subjects/comp_exams.html");
})

app.post("/post-feedback", (req, res)=>{
    const SaveUser = new Feedback(req.body)
    SaveUser.save((error, savedUser)=>{
        if(error) throw error
        res.json(savedUser)
    })
})
''
app.post("/post-contact", (req, res)=>{
    const SaveUser = new Contact(req.body)
    SaveUser.save((error, savedUser)=>{
        if(error) throw error
        res.json(savedUser)
    })
})

app.post("/register",async(req,res)=>{

    const ipassword = req.body.password;  
    const cpassword = req.body.confirmpassword;  
    
    if(ipassword === cpassword){
        const SaveUser = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
        })
        const registered = await SaveUser.save();
        res.redirect("login.html");

    }else{
        res.send("Passwords do not match");
    }
})

app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email: email});
        
        if(useremail.password === password){
            res.redirect("/subjects/computer_courses.html")
        }else{
            res.send("Invalid Email or Password")
        }

    }catch{
        res.status(400).send("Invalid Email or Password")
    }
})





app.listen(port, ()=>{
    console.log("listening to port 3000")
})