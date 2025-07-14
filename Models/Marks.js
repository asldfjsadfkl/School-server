const mongoose =  require('monsoose');
const MarkSchema = new mongoose.Schema({
firsterm:{
name:{type:String},
fatherName:{type:String},
rollN:{type:Number,required:true},
Urdu:{type:Number,default:0},
Eng:{type:Number,default:0},
Isl:{type:Number,default:0},
Phy:{type:Number,default:0},
Che:{type:Number,default:0},
Science:{type:Number,default:0},
pst:{type:Number,default:0},
hist:{type:Number,default:0},
math:{type:Number,default:0},
},
});

module.exports = new mongoose.model('Results',MarkSchema);