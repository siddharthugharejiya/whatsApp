const { Router } = require('express');
const UserModel = require('../Model/UserModel');
const ConversationModel = require('../Model/Conversation');
const MessageModel = require('../Model/Message');
const converstionModel = require('../Model/Conversation');

const UserRouter = Router();

UserRouter.post("/add", async (req, res) => {
    try {
        const data = await UserModel.findOne({ sub: req.body.sub });
        if (data) {
            return res.status(200).json({ msg: "user already exist" });
        }
        const newUser = await UserModel.create(req.body);
        console.log(newUser);
        res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

UserRouter.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Route to add a new conversation
UserRouter.post("/conversation/add", async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;
  
      // Check if conversation already exists between the two users
      const exist = await ConversationModel.findOne({ members: { $all: [receiverId, senderId] } });
      if (exist) {
        return res.status(200).json("Conversation already exists");
      }
  
      // Create new conversation
      const newConversation = new ConversationModel({
        members: [receiverId, senderId],
      });
  
      // Save conversation to the database
      await newConversation.save();
      res.status(200).json(newConversation); // Return the new conversation data
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Handle any errors
    }
  });
  
  // Route to get a conversation between two users
  UserRouter.post("/conversation/get", async (req, res) => {
    try {
      const { senderId, receiverId } = req.body;
  
      // Fetch the conversation based on the members (sender and receiver)
      const conversation = await ConversationModel.findOne({ members: { $all: [receiverId, senderId] } });
      return res.status(200).json(conversation); // Return the conversation data
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Handle any errors
    }
  });

  UserRouter.post("/message/add", async (req, res) => {
    try {
        const { conversationId, text, senderId, receiverId } = req.body;
    
        // Check for required fields
        if (!conversationId || !text || !senderId || !receiverId) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Create a new message
        const message = new MessageModel({
          senderId,
          receiverId,
          text,
          conversationId,
        });
    
        // Save the message
        await message.save();
    
        // Update the conversation with the new message's ID
        await ConversationModel.findByIdAndUpdate(conversationId, { $push: { messages: message._id } });
    
        return res.status(200).json("Message has been sent successfully");
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
    

  UserRouter.get('/message/get/:id',async(req,res)=>{
    try {
        const message =await MessageModel.find({conversationId : req.params.id})
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }

  })

module.exports = UserRouter;
