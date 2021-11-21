import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto.js';
import { UsuarioModelo } from '../usuario/usuario.js';

const { Schema, model } = mongoose;

const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
    {
      type: String,
    },
  ],
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  RealizadoPor: {
    type: Schema.Types.ObjectId,
    ref: UsuarioModelo,
    required: true,
  },
});

const AvanceModelo = model('Avance', avanceSchema);

export { AvanceModelo };