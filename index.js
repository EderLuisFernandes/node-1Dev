/*
ROTAS QUE VAMOS VERIFICAR E CRIAR ALTERA DELETAR, 



*/

const express = require("express");
const uuid = require("uuid");  // aqui vai me retorna um id aleatorio
const cors = require('cors');
const rota = 3004;
const app = express();

app.use(express.json());
app.use(cors())

const usuario = [];

const checarusuarios = (request, response, next) =>{
  const {id} =request.params

  const index = usuario.findIndex(users => users.id === id)
  
  if(index <0){
    return response.status(404).json({Erro:"User not found"})
  }
   request.Usuarioindex = index
   request.usuarioid = id

   next()
}

app.get("/Project", (request, response) => {
  return response.json(usuario);
});

app.post("/Project", (request, response) => {
  const {name, age} = request.body;

  const user = { id: uuid.v4(), name, age };
  

  usuario.push(user);

  return response.status(201).json(usuario);
});

app.put("/Project/:id",checarusuarios, (request, response) => {
 const  index = request.Usuarioindex
  const {name,age}= request.body
  const id = request.usuarioid

  const atualizarUsuario = {id, name, age}

  usuario[index] = atualizarUsuario
  return response.json(atualizarUsuario);
});

app.delete("/Project/:id",checarusuarios, (request, response) => {
  const index =request.Usuarioindex
  usuario.splice(index,1)
  return response.status(204).json();
});

app.listen(rota, () => {
  console.log("📚Projeto, OK📚");
});
