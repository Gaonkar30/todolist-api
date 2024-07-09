const mongoose=require('mongoose')
const {Schema,model}=mongoose;
const taskSchema=new Schema({
    task:{type:String,required:true},
    status:{type:String,required:true},
    date:{type:Date,required:true},
    userid:{type:Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});
const Task=model('Task',taskSchema);
module.exports=Task;
