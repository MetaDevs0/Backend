import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto.js';
import { UsuarioModelo } from '../usuario/usuario.js';

const { Schema, model } = mongoose;

const inscriptionSchema = new Schema({
  estado: {
    type: String,
    enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
    default: 'PENDIENTE',
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: UsuarioModelo,
    required: true,
  },
});

const InscriptionModel = model('Inscripcion', inscriptionSchema, 'inscripciones');

export { InscriptionModel };