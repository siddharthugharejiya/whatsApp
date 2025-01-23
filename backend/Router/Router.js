const { Router } = require('express');
const UserModel = require('../Model/UserModel');
const ConversationModel = require('../Model/Conversation');
const MessageModel = require('../Model/Message');
const upload = require('../utils/upload')
const { GridFsStorage } = require('multer-gridfs-storage');
const EventEmitter = require('events');
const grid = require('gridfs-stream');
const {  mongoose } = require('mongoose');

// EventEmitter for file upload events
class FileEmitter extends EventEmitter {}
const fileEmitter = new FileEmitter();

const UserRouter = Router();

// Add new user
UserRouter.post("/add", async (req, res) => {
    try {
        const data = await UserModel.findOne({ sub: req.body.sub });
        if (data) {
            return res.status(200).json({ msg: "User already exists" });
        }
        const newUser = await UserModel.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all users
UserRouter.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Add conversation
UserRouter.post("/conversation/add", async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const exist = await ConversationModel.findOne({ members: { $all: [receiverId, senderId] } });
        if (exist) {
            return res.status(200).json("Conversation already exists");
        }
        const newConversation = new ConversationModel({ members: [receiverId, senderId] });
        await newConversation.save();
        res.status(200).json(newConversation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get conversation by sender and receiver
UserRouter.post("/conversation/get", async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const conversation = await ConversationModel.findOne({ members: { $all: [receiverId, senderId] } });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Add message to conversation
UserRouter.post("/message/add", async (req, res) => {
    try {
        const { conversationId, text, senderId, receiverId } = req.body;
        if (!conversationId || !text || !senderId || !receiverId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const message = new MessageModel({ senderId, receiverId, text, conversationId });
        await message.save();
        await ConversationModel.findByIdAndUpdate(conversationId, { $push: { messages: message._id } });
        return res.status(200).json("Message has been sent successfully");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get messages by conversationId
UserRouter.get('/message/get/:id', async (req, res) => {
    try {
        const message = await MessageModel.find({ conversationId: req.params.id });
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

UserRouter.post('/file/upload', upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json("File Not Found");
        }
        const f = req.file; 
        console.log(f);

        const fileInfo = {
            id: f.id || f._id, 
            filename: f.filename,
            bucketName: f.bucketName,
            contentType: f.contentType,
        };

        console.log("Uploaded File Info:", fileInfo);

        // Respond with the file URL
        return res.status(200).json({
            imageUrl: `http://localhost:9595/file/upload/${f.filename}`,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: error.message });
    }
});



let gfs, gridFsBucket;

// Setup GridFS storage connection
const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs',
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

// Get file by filename (stream file to client)
UserRouter.get('/file/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const file = await gfs.files.findOne({ filename });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readStream = gridFsBucket.openDownloadStream(file._id);
            readStream.pipe(res); // Stream the file to the response
        } else {
            res.status(400).json({ message: 'File is not an image' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = UserRouter;
