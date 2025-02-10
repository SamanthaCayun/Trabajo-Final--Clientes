import express from "express";
import connectDB from "./config/connectDB.js";
import { clienteRouter } from './routes/clienteRoutes.js';  

const app = express();

connectDB();


app.use(express.json());


app.use("/clientes", clienteRouter);

app.listen(3000, () => {
  console.log("El servidor está activo en http://localhost:3000");
});