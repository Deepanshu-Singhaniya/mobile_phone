var mongoose = require("mongoose");

var mobileSchema = new mongoose.Schema({
    name: String,
    image: String, 
    ram : String, 
    display: String,
    camera: String, 
    battery: String, 
    processor: String,
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]

});

module.exports = mongoose.model("Mobile", mobileSchema);