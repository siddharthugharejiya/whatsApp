const mongoose = require('mongoose');

const Conneted = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://multiera95:95@cluster0.8i0uu.mongodb.net/?retryWrites=true&w=majority",
  
    );
    console.log("Mongoose Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

module.exports = Conneted;
