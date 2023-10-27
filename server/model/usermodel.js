const mongoose = require("mongoose");
const usermigration = require("../migration/usermigration.json")
const userSchema = new mongoose.Schema(usermigration)
module.exports=mongoose.model('User',userSchema);