/*const {Schema, model}=require("mongoose");

const productoSchema= new Schema({
    nombre:String,
    descripcion:String,
    codigo:Number,
    foto:String,
    precio:Number,
    stock:Number,
    timestamp:{type: Date, default:Date.now()}
},{versionKey:false})

module.exports=model('producto', productoSchema);*/

const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        nombre:String,
        descripcion:String,
        codigo:Number,
        foto:String,
        precio:Number,
        stock:Number,
        timestamp:{type: Date, default:Date.now()}
    },{versionKey:false}
)

const model = mongoose.model('producto', schema);

module.exports = model