const ProductManager = require('./productmanager')
const express = require('express');
const router = express.Router(); 
const fs = require('fs')
const productos= new ProductManager()
router.get("/",(req,res)=>{
    const prod=productos.GetProducts()
    if(!prod){
        res.setHeader("content-type","text/plain")
        res.status(400).json({error:"no hay ningun producto por el momento"})
    }
    res.setHeader("content-type","text/plain")
    res.status(200).json({prod})
})
router.get('/:pid',(req,res)=>{
    let id=parseInt(req.params.pid)
    let prod=productos.getProductById(id)
    if(!prod){
        res.setHeader("content-type","text/plain")
        res.status(400).json({error:`el id ${id} no se encuentra`}) 
    }
    res.setHeader("content-type","text/plain")
    res.status(200).json({prod})
})
router.post("/post",(req,res)=>{
 let {id,title,description,code,price,status,stock,category,thumbnails}=req.body
 id=1;
 if (productos.this.products.length>0){
     id=this.products[this.products.length-1].id+1
 }
 let nuevoproducto = {
    id, 
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
    ...req.body
  }
  let propiedades=["title","description","code","price","status","stock","category"]
  const valido=propiedades.every(propiedad=>Object.keys(nuevoproducto).includes(propiedad))
  if(!valido){
    res.setHeader("content-type","text/plain")
    res.status(400).json({error:"le falto agregar alguna propiedad"})
  }
  const strings = [nuevoproducto.title, nuevoproducto.description, nuevoproducto.code, nuevoproducto.category]
  const valido2=strings.every(valor=>typeof valor==='string')
  if (!valido2) {
    res.setHeader("content-type","text/plain")
    res.status(400).json({error:`alguna de las siguientes variables no es un string: ${strings}`})
  }
  if(typeof(nuevoproducto.price)=== "number"&& typeof(nuevoproducto.stock)==="number"){
    productos.this.products.push(nuevoproducto)
      fs.writeFileSync(this.path,JSON.stringify(productos.this.products,null,"\t"))
      res.setHeader("content-type","text/plain")
        res.status(200).send("elemento subido :)")
  }
  else{
    res.setHeader("content-type","text/plain")
    res.status(400).json({error:"la propiedad price o stock no son un numero"})
  }
})

router.put('/put/:pid',(req,res)=>{
    let {id,title,description,code,price,status,stock,category,thumbnails}=req.body
    let ids=parseInt(req.params.pid)
    let prods=productos.GetProducts()
    if(!prods){
        res.setHeader("content-type","text/plain")
        res.status(400).json({error:"no hay ningun producto"})
    }    
    let pos=prods.findIndex(producto=>producto.id===ids)
    if(pos===-1){
        res.setHeader("content-type","text/plain")
        res.status(400).json({error:"no hay ningun producto con ese id"})   
    }    
    let nuevoprod={...prods[pos],
        ...req.body,
        id
    }
    let propiedades=["title","description","code","price","status","stock","category"]
  const valido=propiedades.every(propiedad=>Object.keys(nuevoprod).includes(propiedad))
  if(!valido){
    res.setHeader("content-type","text/plain")
    res.status(400).json({error:"le falto agregar alguna propiedad"})
  }
    productos.this.products.push(nuevoprod)
      fs.writeFileSync(productos.this.path,JSON.stringify(productos.this.products,null,"\t"))
      res.setHeader("content-type","text/plain")
        res.status(200).send("elemento actualizado :)")
  
})
router.delete("/delete/:pid",(req,res)=>{
    let {pid}=req.params
    pid=parseInt(pid)
    if(isNaN(pid)){
        res.setHeader("content-type","text/plain")
        res.status(400).json({error:"no introdujo un numero valido"})  
    }
    let resultado=productos.DeleteProduct(pid)
    if(resultado.error){
        res.setHeader("content-type","text/plain")
        res.status(400).json({error:"no existe un producto con ese id"})  
    }
    else{
        res.setHeader("content-type","text/plain")
        res.status(200).send("producto eliminado correctamente")
    }
    
})

const server = app.listen(PORT, () => {
    console.log("server online")
  })
module.exports=router
