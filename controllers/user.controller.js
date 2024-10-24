const User = require('../models/User.model.js');
 
  const getUsersForSidebar = async(req,res)=>{

    try {

        const loggedInUserId = req.payload._id
        console.log("Payload:", req.payload);

        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
         
    } catch (error) {
        console.log("Error in getUsersForSidebar:", error.message)
        res.status(500).json({error:"Internal server error"})
    }

 }

 module.exports = {getUsersForSidebar}