
const mongoose = require('mongoose')
const followmigration = require('../migration/follow.json')
const FollowMigration = new mongoose.Schema(followmigration)
module.exports=mongoose.model("follow",FollowMigration)