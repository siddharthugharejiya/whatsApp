const mongoose = require('mongoose')
 const Conneted = async() =>{

   await mongoose.connect("mongodb+srv://multiera95:95@cluster0.8i0uu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   console.log("Mongoose Conntected");
   
}

module.exports = Conneted