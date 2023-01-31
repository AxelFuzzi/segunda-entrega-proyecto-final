const ProductoDAO=require('../contenedorProducto.js')

class productoService{
	constructor(){}
	async createProducto(producto){
		return ProductoDAO.createProducto(producto);
	}
	async vistaProducto(){
		return ProductoDAO.vistaProductos();
	}
	async vistaProductoid(id){
		return ProductoDAO.vistaProductosid(id);
	}
	async borrarProducto(id){
		return ProductoDAO.borrarProducto(id);
	}
}
module.exports=new productoService();