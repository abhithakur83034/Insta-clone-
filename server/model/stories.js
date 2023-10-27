
const mongoose = require('mongoose')
const storiesmigration = require('../migration/stories.json')
const StoriesMigration = new mongoose.Schema(storiesmigration)
module.exports=mongoose.model("stories",StoriesMigration)