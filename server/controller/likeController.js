const likemodel = require("../model/like");

const like = async (req, res) => {
  // console.log(req.query)
  const { postId, likedBy, userId } = req.query;
  try {
    const existingPost = await likemodel.findOne({ postId, likedBy, userId });

    if (existingPost) {
      await likemodel.findOneAndUpdate(
        { postId, userId },
        { $pull: { likedBy: likedBy } },
        { new: true }
      );

      return res.status(200).json({
        message: `Disliked item with ID ${likedBy}`,
        status: "dislike",
      });
    }
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }



  const checkPost = await likemodel.findOne({ postId });

  if (checkPost) {
    const updatedPost = await likemodel.findByIdAndUpdate(
      checkPost._id,
      { $addToSet: { likedBy: likedBy } },
      { new: true }
    );

    if (updatedPost) {
      return res.status(200).json({ message: "Post liked", status: "like" });
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  }



  try {
    const like = await likemodel.insertMany(req.query);
    return res.status(200).json({ like, status: "like" });
  } catch (error) {
    res.status(500).send("Internal server error" + error);
  }
};



const getLike = async (req, res) => {
  try {
    const allLike = await likemodel.find(req.body);
    res.status(200).json({ allLike, status: "success" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  like,
  getLike,
};
