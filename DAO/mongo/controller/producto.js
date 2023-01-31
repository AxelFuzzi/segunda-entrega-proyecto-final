
const ProductoService=require('../services/producto')
class ProductoControlador{
	constructor(modelo){
		this.model=modelo;
	}
	async productoController (req,res,next){
		try{
			if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto 
				|| !req.body.precio || !req.body.stock){
				throw new Error ("debe rellenar todos los datos solicitados")
			}
			let productoGuardar={
				"nombre":req.body.nombre,
				"descripcion":req.body.descripcion,
				"codigo":req.body.codigo,
				"foto":req.body.foto,
				"precio":req.body.precio,
				"stock": req.body.stock
			};
			let resultado=await ProductoService.createProducto(productoGuardar);
			if (resultado.length==0){
				throw new Error("Error al guardar el archivo");
			}
			
			res.status(200).json(resultado);
		}catch(e){
			res.status(404).json({"error":e.message});
		}
		
	}
	async productovController(req,res,next){
		try{
			
			if(Object.keys(req.query).length){
                let productoFiltrar = {}
                if(req.query.nombre){
					productoFiltrar.nombre = req.query.nombre;
				} 
                if(req.query.codigo) {
					productoFiltrar.codigo = req.query.codigo
				}
                if((req.query.precio_max && req.query.precio_min)||(req.query.precio_max && parseInt(req.query.precio_min>=0))){
					productoFiltrar.precio_max=parseInt(req.query.precio_max);
					productoFiltrar.precio_min=parseInt(req.query.precio_min);

				}
                if((req.query.stock_max && req.query.stock_min)||(req.query.stock_max && parseInt(req.query.stock_min>=0))){
					productoFiltrar.stock_max=parseInt(req.query.stock_max);
					productoFiltrar.stock_min=parseInt(req.query.stock_min);
				}

                const productos = await ProductoService.filtro(productoFiltrar)
                return res.json(productos)

            }
			if(!req.params.id){
				var contenido= await ProductoService.vistaProducto();
				if (contenido.length==0){
					throw new Error('no hay productos cargados')
				}
			}else{
				var contenido=await ProductoService.vistaProductoid(req.params.id);
				if (contenido.length==0){
					throw new Error('Producto no encontrado');
				}
			}
			
			res.status(200).json(contenido);
		}catch(e){
			res.status(404).json ({"error": e.message});
		}
	}
	async productoActualizarid(req,res,next){
		try{
			//me fijo si el producto existe
			let producto=await ProductoService.vistaProductoid(req.params.id);
			if (producto.length==0){
				throw new Error("El producto buscado no existe");
			}    
		
			let productoaModificar={
				"nombre":req.body.nombre,
				"descripcion":req.body.descripcion,
				"codigo":req.body.codigo,
				"foto":req.body.foto,
				"precio":req.body.precio,
				"stock": req.body.stock,
				"id":req.params.id
			}
			let productoModificado=await ProductoService.actualizarProducto(productoaModificar);
			if (productoModificado.length==0){
				throw new Error("Se ha producido un error al modificar el producto");
			}else{
				res.json(productoModificado);
			}
	
		}catch(e){
			res.status(404).json({"error": e.message});
		}    
	}
	async productobController(req,res,next){
		try{
			let producto={
				"title":req.body.title,
				"price": req.body.price,
				"thumbnail":req.body.thumbnail,
				"id":req.params.id
			}
			let borrado=await ProductoService.borrarProducto(req.params.id);
			res.json(producto);
		}catch(e){
			res.json({"error":e.message});
		}
	}
}
module.exports=new ProductoControlador();
