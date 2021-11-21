import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correo :{
    type: String,
    required: true,
    unique: true,
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  },
});
u
const UsuarioModelo = model('Usuario', usuarioSchema);

export { UsuarioModelo };  