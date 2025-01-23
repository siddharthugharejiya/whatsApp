const { Router } = require('express');
const UserModel = require('../Model/UserModel');
const ConversationModel = require('../Model/Conversation');
const MessageModel = require('../Model/Message');
const upload = require('../utils/upload')
const { GridFsStorage } = require('multer-gridfs-storage');
const EventEmitter = require('events');
const grid = require('gridfs-stream');
const {  mongoose } = require('mongoose');

class FileEmitter extends EventEmitter {}


const UserRouter = Router();


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

UserRouter.get("/users", async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


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

UserRouter.post("/conversation/get", async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const conversation = await ConversationModel.findOne({ members: { $all: [receiverId, senderId] } });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


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

        return res.status(200).json({
            imageUrl: `http://localhost:9595/file/upload/${f.filename}`,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: error.message });
    }
});



let gfs, gridFsBucket;


const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs',
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

UserRouter.get('/file/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const file = await gfs.files.findOne({ filename });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readStream = gridFsBucket.openDownloadStream(file._id);
            readStream.pipe(res); 
        } else {
            res.status(400).json({ message: 'File is not an image' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = UserRouter;
