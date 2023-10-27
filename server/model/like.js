
const mongoose = require('mongoose')
const likemigration = require('../migration/like.json')
const LikeMigration = new mongoose.Schema(likemigration)
module.exports=mongoose.model("like",LikeMigration)