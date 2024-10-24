const Conversation = require('../models/conversation.model.js');
const Message = require('../models/message.model.js');

exports.sendMessage = async (req, res) => {
    try {
        const {message} = req.body
        const {id:receiverId} = req.params
        const senderId = req.payload._id
 
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]

            }
        })
          
        if (!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        //await conversation.save()
        //await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller:", error.message)
        res.status(500).json({error:"Internal server error"})
    }
  
};


exports.getMessages = async(req,res) =>{
    
    try {

        const {id:userToChatId}= req.params
        const senderId = req.payload._id

        const conversation = await Conversation.findOne ({
            participants: {$all:[senderId, userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([])

            const messages = conversation.messages

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in getMessage controller:", error.message)
        res.status(500).json({error:"Internal server error"})

    }

}