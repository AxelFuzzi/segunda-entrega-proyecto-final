const carritoModel=require('./schemas/carrito.js')

class carritoDAO{
	async createProducto({producto}){
		return await carritoModel.create({producto});
	}
	async vistaProductos(){
		return carritoModel.find().populate("producto");
	}
	async vistaProductosid(id){
		return carritoModel.findById(id).populate("producto");
	}
	async borrarProducto(id){
		await carritoModel.deleteOne({ _id: id})
	}
};
module.exports=new carritoDAO();