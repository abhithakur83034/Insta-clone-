const mongoose = require('mongoose')
const createpostmigration = require('../migration/createpost.json')
const CreatePostMigration = new mongoose.Schema(createpostmigration)
module.exports=mongoose.model("createpost",CreatePostMigration)