const storiesmodel = require("../model/stories");


const stories = async (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);
  try {
    const { title, userId } = req.body;
    const image = req.file.filename;
    const storyData = { title, image, userId };

    const existingStory = await storiesmodel.findOne({ userId });

    if (existingStory) {
      // Update the existing story
      const updatedStory = await storiesmodel.findOneAndUpdate(
        { userId },
        { $addToSet: { image: image, title: title } },
        { new: true }
      );

      if (updatedStory) {
        return res.status(200).json({ message: "Story updated", status: "success", story: updatedStory });
      } else {
        return res.status(404).json({ message: "Story not found" });
      }
    } else {
      // Create a new story
      const newStory = new storiesmodel(storyData);
      const createdStory = await newStory.save();
      res.status(200).json({ message: "Story created", status: "success", story: createdStory });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const getstories = async (req, res) => {
  try {
    const allstories = await storiesmodel.find(req.body);
    res.status(200).json({ allstories, status: "success" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};


const deleteStories=async(req,res)=>{
  try {
    const deletesingle = await storiesmodel.deleteOne();
    res.status(200).json({message:deletesingle, status:"Deleted Successfully"});
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}



module.exports = {
  stories,
  getstories,
  deleteStories,
};
