require('dotenv').config();
const mongoose=require('mongoose')
const URIy=process.env.MONGO_URI
mongoose.connect(URIy,{useNewUrlParser:true,useUnifiedTopology:true});
module.exports={mongoose};