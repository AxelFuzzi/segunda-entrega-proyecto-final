const {Schema, model}=require("mongoose");

const carritoSchema= new Schema(
    {
        producto:{
            type: Schema.Types.ObjectId,
            ref: 'producto',
            required: true},
        timestamp:{type: Date, default:Date.now()}
    },
    {
        versionKey:false
    })

module.exports=model('carrito', carritoSchema);