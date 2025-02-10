import Cliente from '../models/cliente.js';


export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const crearCliente = async (req, res) => {
  const { nombre, email, telefono } = req.body;

  
  if (!nombre || !email || !telefono) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res.status(400).json({ message: 'El cliente con este email ya existe.' });
    }

    const cliente = new Cliente({ nombre, email, telefono });
    const nuevoCliente = await cliente.save();
    
  
    res.status(201).json({ message: `Cliente ${nuevoCliente.nombre} agregado exitosamente.`, cliente: nuevoCliente });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const modificarCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

 
    if (nombre) cliente.nombre = nombre;
    if (email) cliente.email = email;
    if (telefono) cliente.telefono = telefono;

    const clienteActualizado = await cliente.save();
    

    res.json({ message: `Cliente ${clienteActualizado.nombre} modificado exitosamente.`, cliente: clienteActualizado });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const eliminarCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: `Cliente ${cliente.nombre} eliminado exitosamente.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

