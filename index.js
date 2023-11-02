var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const app = express()
// const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// connect to sign up database
mongoose.connect('mongodb://0.0.0.0:27017/local',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// connect to bmi
mongoose.createConnection('mongodb://0.0.0.0:27017/local', {
     useNewUrlParser: true,
     useUnifiedTopology: true 
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// sign up
app.post("/sign_up",(req,res)=>{
    var Username = req.body.Username;
    var email = req.body.email;
    var password = req.body.password;
    var RepeatPassword = req.body.RepeatPassword;

    var data = {
        "Username": Username,
        "email" : email,
        "password" : password,
        "RepeatPassword": RepeatPassword
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("join details Inserted Successfully");
    });

    return res.redirect('login.html')

})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('ljoin.html');
}).listen(5500);


// login
app.post("/login",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "email" : email,
        "password" : password,
    }

    db.collection('loginusers').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("login details Inserted Successfully");
    });
    return res.redirect('lindex.html')
    

})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
}).listen(5501);


