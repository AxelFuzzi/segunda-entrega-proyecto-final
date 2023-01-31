const CarritoService=require('../services/carrito')
const ProductoService=require('../services/producto')
class CarritoControlador{
	constructor(modelo){
		this.model=modelo;
	}
	async carritoController (req,res,next){
		try{
			let prod=await ProductoService.vistaProductoid(req.params.id);
			if (prod.length==0){
				throw new Error('Producto no encontrado');
			}
			let productoGuardar={
				"producto":prod
			};
			let resultado=await CarritoService.createProducto(productoGuardar);
			if (resultado.length==0){
				throw new Error("Error al guardar el archivo");
			}
			res.status(200).json(resultado);
		}catch(e){
			res.status(404).json({"error":e.message});
		}
		
	}
	async carritovController(req,res,next){
		try{
			
			if(!req.params.id){
				var contenido= await CarritoService.vistaProducto();
				if (contenido.length==0){
					throw new Error('no hay productos cargados')
				}
			}else{
				var contenido=await CarritoService.vistaProductoid(req.params.id);
				if (contenido.length==0){
					throw new Error('Producto no encontrado');
				}
			}
			
			res.status(200).json(contenido);
		}catch(e){
			res.status(404).json ({"error": e.message});
		}
	}
	
	async carritobController(req,res,next){
		try{
			var producto=await CarritoService.vistaProductoid(req.params.id);
			if (producto.length==0){
				throw new Error('Producto no encontrado');
			}
			let borrado=await CarritoService.borrarProducto(req.params.id);
			if (borrado!=1){
				throw new Error("error al borrar el producto");
			}
			res.json(producto);
		}catch(e){
			res.json({"error":e.message});
		}
	}
}
module.exports=new CarritoControlador();
