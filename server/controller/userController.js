const usermodel = require("../model/usermodel");


const userRegister = async(req,res)=>{
    console.log(req.body);
    // const image = req.file.filename;
    const {name,email,password,username} = req.body;

    const userData = {name,email,password,username}
    console.log(userData);
    try {
        const user = await usermodel.insertMany(userData)
        res.status(200).json({message:user, status:"success"})
    } catch (error) {
        res.status(500).send("internal server error")
    }
}


const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usermodel.findOne({ $and: [{ username }, { password }] });

    if (!user) {
      console.log("User not found");
      // You might want to return an error response in your API here.
    } else {
      console.log("User found:", user);
      // Proceed with your success logic.
    }
    
      if (!user) {
          return res.status(404).json({ message: 'User not found', status: 'error' });
      }

      res.status(200).json({ message: user, status: 'success' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error', status: 'error' });
  }
};


const Registereduser=async(req,res)=>{
    try {
        const user = await usermodel.find(req.body)
        res.status(200).json({message:user, status:"success"})
    } catch (error) {
        res.status(500).send("Internal server error")
    }

}

const updateProfile = async (req, res) => {
    console.log(req.body);
    try {
      // Find the user by their unique identifier (e.g., user ID)
      const userId = req.params.id;
      console.log(userId)
      // Create an object to hold the fields you want to update
      const updateFields = {};
  
      // Check and update each field individually
      if (req.file && req.file.filename !== undefined) {
        updateFields.image = req.file.filename;
      }
  
      if (req.body.name !== undefined) {
        updateFields.name = req.body.name;
      }
      if (req.body.username !== undefined) {
        updateFields.username = req.body.username;
      }
  
      if (req.body.mobile !== undefined) {
        updateFields.mobile = req.body.mobile;
      }
  
      if (req.body.email !== undefined) {
        updateFields.email = req.body.email;
      }
  
      if (req.body.password !== undefined) {
        updateFields.password = req.body.password;
      }
  
      if (req.body.address !== undefined) {
        updateFields.address = req.body.address;
      }
  
      if (req.body.country !== undefined) {
        updateFields.country = req.body.country;
      }
  
      if (req.body.about !== undefined) {
        updateFields.about = req.body.about;
      }
  
      const updatedUser = await usermodel.findByIdAndUpdate(
        userId,
        {
          $set: updateFields,
        },
        {
          new: true, 
          runValidators: true, 
        }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    userRegister,
    userLogin,
    Registereduser,
    updateProfile
}