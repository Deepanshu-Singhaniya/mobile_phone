var express =require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var Mobile = require("./models/mobile");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seed");



mongoose.connect('mongodb+srv://Admin-Deepanshu:adcluster@cluster0.fcoxy.mongodb.net/mobile_phone', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("Public"));

app.use(require("express-session")({
    secret: "I love bootstrap paradox",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();
// console.log(__dirname);
// var mobileSchema = new mongoose.Schema({
//     name: String,
//     image: String, 
//     ram : String, 
//     display: String,
//     camera: String, 
//     battery: String, 
//     processor: String

// });

// var Mobile = mongoose.model("Mobile", mobileSchema);

// Mobile.create(
//     {
//         name: "Infinix Hot 9 (Violet, 64 GB)  (4 GB RAM)", 
//         image: "https://rukminim1.flixcart.com/image/416/416/k8g8knk0/mobile/m/b/z/infinix-hot-9-x655d-original-imafqgr9j7gh32zq.jpeg?q=70",
//         ram: "4 GB RAM | 64 GB ROM | Expandable Upto 256 GB",
//         display: "16.76 cm (6.6 inch) HD+ Display",
//         camera:"13 MP + 2 MP + 2 MP + Low Light Sensor | 8MP Front Camera",
//         battery: "5000 mAh Li-ion Polymer Battery",
//         processor:"MediaTek Helio P22 (64 bit) Processor"

//     }, function(err, mobile){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly created mobile phone");
//             console.log(mobile);
//         }

// });

var mobiles = [
    {
        name: "Mi 10 (Twilight Grey, 256 GB)  (8 GB RAM)",
        image: "https://rukminim1.flixcart.com/image/416/416/kdxfc7k0/mobile/6/f/h/mi-10-mzb9044in-original-imafuq92ausjrxaz.jpeg?q=70",
        ram: "8 GB RAM | 256 GB ROM",
        display: "16.94 cm (6.67 inch) Display ",
        camera:"108MP + 13MP + 2MP + 2MP | 20MP Front Camera",
        battery: "4780 mAh Battery",
        processor:"Qualcomm Snapdragon 865 Processor Full HD+ 3D Curved E3 AMOLED HDR 10+ Display 30 W Charging"                           
    },
    {
        name: "Infinix Hot 9 (Violet, 64 GB)  (4 GB RAM)", 
        image: "https://rukminim1.flixcart.com/image/416/416/k8g8knk0/mobile/m/b/z/infinix-hot-9-x655d-original-imafqgr9j7gh32zq.jpeg?q=70",
        ram: "4 GB RAM | 64 GB ROM | Expandable Upto 256 GB",
        display: "16.76 cm (6.6 inch) HD+ Display",
        camera:"13 MP + 2 MP + 2 MP + Low Light Sensor | 8MP Front Camera",
        battery: "5000 mAh Li-ion Polymer Battery",
        processor:"MediaTek Helio P22 (64 bit) Processor"
    },
    {
        name: "OPPO F17 Pro (Magic Blue, 128 GB)  (8 GB RAM)", 
        image: "https://rukminim1.flixcart.com/image/416/416/kekadu80/mobile/x/n/y/oppo-f17-pro-cph2119-original-imafv7pxhjkcrv3q.jpeg?q=70",
        ram: "8 GB RAM | 128 GB ROM | Expandable Upto 256 GB",
        display: "16.33 cm (6.43 inch) Full HD+ Display",
        camera:"48MP + 8MP + 2MP + 2MP | 16MP + 2MP Dual Front Camera",
        battery: "4015 mAh Lithium-ion Battery",
        processor:"MediaTek Helio P95 Processor"
    },
    {
        name: "itel Vision1 (Gradation Green, 32 GB)  (3 GB RAM) ", 
        image: "https://rukminim1.flixcart.com/image/416/416/kdqa4y80/mobile/r/h/s/itel-vision1-l6005-original-imafuk67eq2ptp6z.jpeg?q=70",
        ram: "3 GB RAM | 32 GB ROM | Expandable Upto 128 GB",
        display: "15.46 cm (6.088 inch) HD+ Display",
        camera:"8MP + 0.3MP | 5MP Front Camera",
        battery: "4000 mAh Lithium-ion Polymer Battery",
        processor:"Unisoc SC9863A Octa Core Processor"
    },
    {
        name: "Redmi 9i (Midnight Black, 64 GB)  (4 GB RAM)",
        image: "https://rukminim1.flixcart.com/image/416/416/kesv0y80/mobile/h/p/q/redmi-9i-mzb0814in-original-imafvehkgzghyqtp.jpeg?q=70",
        ram: "4 GB RAM | 64 GB ROM | Expandable Upto 512 GB",
        display: "16.59 cm (6.53 inch) HD+ Display ",
        camera:"13MP Rear Camera | 5MP Front Camera",
        battery: "5000 mAh Lithium Polymer Battery",
        processor:"MediaTek Helio G25 Processor" 

    }
    
];

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.render("home")
});

app.get("/mobiles", function(req, res){
    Mobile.find({}, function(err, allMobiles){
        if(err){
            console.log(err);
        }else{
            res.render("mobiles/index", {mobiles: allMobiles, currentUser: req.user});
        }
    })

})

app.post("/mobiles",isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var ram = req.body.ram;
    var display = req.body.display;
    var camera = req.body.camera;
    var battery = req.body.battery;
    var processor = req.body.processor;
    var newMobile = {name: name, image: image, ram: ram, display: display, camera: camera, battery: battery, processor: processor};
    
    Mobile.create(newMobile, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            res.redirect("/mobiles");
        }
    });   
});

app.get("/mobiles/new",isLoggedIn,  function(req, res){
    res.render("mobiles/new");
});

app.get("/mobiles/:id", function(req,res){
    Mobile.findById(req.params.id).populate("comments").exec(function(err, foundmobile){
        if(err){
            console.log(err);
        }else{
            res.render("mobiles/show", {mobile: foundmobile});
        }
    });
});

app.post("/searched", function(req, res){
    var brand = req.body.brand;
    var cpu = req.body.cpu;
    var ram = req.body.ram;
    var camera = req.body.camera;
    var mobiledata = {
        brand: brand, 
        cpu: cpu,
        ram : ram,
        camera: camera
    }
    if(brand !== "null"){
     
        const fetch = require('node-fetch');

        (async () => {
        const where = encodeURIComponent(JSON.stringify({
            "Brand": brand
        }));
        const response = await fetch(
            `https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&where=${where}`,
            {
            headers: {
                'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', 
                'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', 
            }
            }
        );
        var data = await response.json(); // Here you have the data that you need

        // var nonparsed = JSON.stringify(data, null, 2);
        // var parseddata= JSON.parse(nonparsed);
        // console.log(parseddata.results[0]);
        res.render("searched", {data: data.results});
        })();
            }
    if(cpu !== "null" ){
        if(cpu == "Accending"){
            const fetch = require('node-fetch');

            (async () => {
            const where = encodeURIComponent(JSON.stringify({
                "Brand": {
                "$exists": true
                }
            }));
            const response = await fetch(
                `https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&order=CPU&where=${where}`,
                {
                headers: {
                    'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', // This is your app's application id
                    'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', // This is your app's REST API key
                }
                }
            );
            const data = await response.json(); // Here you have the data that you need
            // console.log(JSON.stringify(data, null, 2));
            res.render("searched", {data: data.results});
            })();
        }
        if(cpu == "Decending"){
            const fetch = require('node-fetch');

            (async () => {
            const where = encodeURIComponent(JSON.stringify({
                "Brand": {
                "$exists": true
                }
            }));
            const response = await fetch(
                `https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&order=-CPU&where=${where}`,
                {
                headers: {
                    'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', // This is your app's application id
                    'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', // This is your app's REST API key
                }
                }
            );
            const data = await response.json(); // Here you have the data that you need
            // console.log(JSON.stringify(data, null, 2));
            res.render("searched", {data: data.results});
            })();
        }
    }
    if(camera !== "null" ){
        if(camera == "Accending"){
            const fetch = require('node-fetch');

            (async () => {
            const response = await fetch(
                'https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&order=Primary_camera',
                {
                headers: {
                    'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', // This is your app's application id
                    'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', // This is your app's REST API key
                }
                }
            );
            const data = await response.json(); // Here you have the data that you need
            // console.log(JSON.stringify(data, null, 2));
            res.render("searched", {data: data.results});
            })();   
        }
        if(camera == "Decending"){
            const fetch = require('node-fetch');

            (async () => {
            const response = await fetch(
                'https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&order=-Primary_camera',
                {
                headers: {
                    'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', // This is your app's application id
                    'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', // This is your app's REST API key
                }
                }
            );
            const data = await response.json(); // Here you have the data that you need
            // console.log(JSON.stringify(data, null, 2));
            res.render("searched", {data: data.results});
            })();   
        }
    }
    if(ram !== "null" ){
        if(ram == "Accending"){
            const fetch = require('node-fetch');

            (async () => {
                const response = await fetch(
                  'https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&order=RAM',
                  {
                    headers: {
                      'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', // This is your app's application id
                      'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', // This is your app's REST API key
                    }
                  }
                );
            const data = await response.json(); // Here you have the data that you need
            // console.log(JSON.stringify(data, null, 2));
            res.render("searched", {data: data.results});
            })();   
        }
        if(ram == "Decending"){
            const fetch = require('node-fetch');

            (async () => {
                const response = await fetch(
                  'https://parseapi.back4app.com/classes/Cellphonedataset_Dataset_Cell_Phones_Model_Brand?limit=100&order=-RAM',
                  {
                    headers: {
                      'X-Parse-Application-Id': 'rzoYwhVACc9O1xzTYXAqflwPjEuTA8H2WrKQVYFq', // This is your app's application id
                      'X-Parse-REST-API-Key': '8CSW7JvX8jys49fjY3knITiZrz3yyZUN4WNluGMR', // This is your app's REST API key
                    }
                  }
                );
            const data = await response.json(); // Here you have the data that you need
            // console.log(JSON.stringify(data, null, 2));
            res.render("searched", {data: data.results});
            })();   
        }
    }
});

app.get("/filter", function(req, res){
    res.render("filter");
});

app.get("/mobiles/:id/comments/new",isLoggedIn,  function(req, res){
    Mobile.findById(req.params.id, function(err, mobile){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {mobile: mobile});
        }
    });
});

app.post("/mobiles/:id/comments",isLoggedIn, function(req, res){
    // var author = req.body.author;
    // var text = req.body.text;
    // var comment = { author: author, text: text};
    Mobile.findById(req.params.id, function(err, mobile){
        if(err){
            res.redirect("/mobiles");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    mobile.comments.push(comment);
                    mobile.save();
                   
                    res.redirect("/mobiles/"+ mobile._id);
                }
            })
        }
    });
});


app.get("/register", function(req, res){
    res.render("register");
});
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/mobiles");
            });
        }
    });
});

app.get("/login", function(req, res){
    res.render("login");
});
app.post("/login", passport.authenticate("local",{
        successRedirect: "/mobiles",
        failureRedirect: "/login    "
    }), function(req, res){
    res.send("HI there");
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/mobiles");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(port || 3000, function(){
    console.log("The Mobile Phone Database has started");
});