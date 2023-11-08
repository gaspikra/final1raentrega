const express=require('express')
const routerprods=require("./routter.js")
const carrito=require("./routercarrito.js")
const PORT=8080
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/usuarios",routerprods)
app.use("/api/carts",carrito)
app.get("/",(req,res)=>{
    res.send("<h2 style='color:blue;'>bienvenido, aqui podras realizar operaciones con productos!</h2>")
})

const server = app.listen(PORT, () => {
    console.log("server online")
  });