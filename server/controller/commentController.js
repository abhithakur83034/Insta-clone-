const commentmodel = require('../model/comment');


const comment = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).send("Internal server error" + error)
    }
}

module.exports={
    comment
}