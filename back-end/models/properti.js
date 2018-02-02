const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/finalproject");

const Schema = mongoose.Schema;

const propertiSchema = new Schema({
 
    luasBangunan :  String,
    luasTanah : String,
    address : String,
    price : String,
    profile : String
});

const Properti = mongoose.model("properti", propertiSchema);

module.exports = Properti;  