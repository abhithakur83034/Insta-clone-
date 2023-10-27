const followModel = require("../model/follow");

const follow = async (req, res) => {
  const { userId, following, image } = req.query;

  try {
    const existingFollow = await followModel.findOne({ userId, following });

    if (existingFollow) {
      await followModel.findOneAndUpdate(
        { userId, following },
        { $pull: { following, image } },
        { new: true }
      );

      return res.status(200).json({
        message: `Unfollow user with ID ${following}`,
        status: "unfollow",
      });
    }

    const checkfollow = await followModel.findOne({ userId });
    
    if (checkfollow) {
      const updatedFollow = await followModel.findByIdAndUpdate(
        checkfollow._id, 
        { $addToSet: { following, image } },
        { new: true }
      );

      if (updatedFollow) {
        return res.status(200).json({ message: "Follow", status: "follow" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      const newFollow = new followModel({
        userId,
        following: [following],
        image: [image]
      });

      await newFollow.save();

      return res.status(200).json({ message: "Follow", status: "follow" });
    }
  } catch (error) {
    res.status(500).send("Internal server error: " + error);
  }
};


const getFollow = async (req, res) => {
  try {
    const getfollow = await followModel.find(req.body);
    res.status(200).send(getfollow);
  } catch (error) {
    res.status(500).send("internal server error" + error);
  }
};

const deleteFollow = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    es.status(500).send("Internal server error");
  }
};

module.exports = {
  follow,
  getFollow,
  deleteFollow,
};
