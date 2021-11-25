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
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }, 
});

usuarioSchema.virtual('avances', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'realizadoPor',
});

usuarioSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'estudiante',
});

const UsuarioModelo = model('Usuario', usuarioSchema);

export { UsuarioModelo };  