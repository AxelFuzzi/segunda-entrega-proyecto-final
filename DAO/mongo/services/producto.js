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
	async actualizarProducto(producto){
		return ProductoDAO.modificar(producto);
	}
	async borrarProducto(id){
		return ProductoDAO.borrarProducto(id);
	}
	async filtro(producto){
		return ProductoDAO.filtro(producto);
	}
}
module.exports=new productoService();