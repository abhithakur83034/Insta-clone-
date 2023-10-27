const mongoose = require('mongoose')
const commentmigration = require('../migration/comment.json')
const CommentMigration = new mongoose.Schema(commentmigration)
module.exports=mongoose.model("comment",CommentMigration)