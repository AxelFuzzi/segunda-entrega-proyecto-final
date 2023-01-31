const productModel=require("./schemas/producto.js");

class productoDAO{
	async createProducto({nombre,descripcion,codigo,foto,precio,stock}){
		return await productModel.create({nombre,descripcion,codigo,foto,precio,stock});
	}
	async vistaProductos(){
		return productModel.find();
	}
	async vistaProductosid(id){
		return productModel.findById(id);
	}
	async modificar({id,nombre,descripcion,codigo,foto,precio,stock}){
		
		const productoModificar=await productModel.findByIdAndUpdate(id,{nombre,descripcion,codigo,foto,precio,stock},{new:true})
		return productoModificar
	}
	async borrarProducto(id){
		await productModel.deleteMany({ _id: id})
	}
	async filtro(producto){
		if((producto.precio_max && producto.precio_min)||(producto.precio_max && producto.precio_min>=0)){
			return productModel.find({$and:[{precio:{$gt:producto.precio_min}},{precio:{$lt:producto.precio_max}}]})
		}
		if((producto.stock_max && producto.stock_min)||(producto.stock_max && producto.stock_min>=0)){
			return productModel.find({$and:[{stock:{$gt:producto.stock_min}},{stock:{$lt:producto.stock_max}}]})
		}
		return productModel.find(producto)
	}
};
module.exports = new productoDAO();