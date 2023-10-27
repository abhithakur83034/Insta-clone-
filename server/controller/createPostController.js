const createPostModel = require("../model/createpost");


const createpost=async(req,res)=>{
    console.log("req",req.body);
  const {caption,userId} = req.body
//   console.log(postc)
   const image = req.file.filename
   console.log(image);
    const post = {caption,userId,image }
    console.log(post)
    try {
        const postcreate = await createPostModel.insertMany(post)
        res.status(200).json({message:postcreate, status:"success"})
    } catch (error) {
        res.status(500).send("Internal server error"+error)
    }
}


const getpost=async(req,res)=>{
    console.log(req.body)
    try {
        const post = await createPostModel.find(req.body)
        res.status(200).json({post, status:"success"})
    } catch (error) {
        res.status(500).send("internal server error")
    }
}



module.exports={
    createpost,
    getpost,
}



