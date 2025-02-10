import express from 'express';
import { listarClientes, crearCliente, modificarCliente, eliminarCliente } from '../controllers/clienteController.js';

const clienteRouter = express.Router();


clienteRouter.get('/lista', listarClientes);
clienteRouter.post('/crear', crearCliente);
clienteRouter.put('/:id', modificarCliente);
clienteRouter.delete('/:id', eliminarCliente);

export { clienteRouter };  

