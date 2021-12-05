import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enumTipos.js';
import { tiposUsuario } from '../models/usuario/types.js';
import { tiposProyecto } from '../models/proyecto/types.js';
import { tiposAvance } from '../models/avance/types.js';
import { tiposInscripcion } from '../models/inscripcion/types.js';
import { tiposAutenticacion } from './auth/types.js';

const tiposGlobales = gql`
  scalar Date
`;

export const types = [
  tiposGlobales,
  tiposEnums,
  tiposUsuario,
  tiposProyecto,
  tiposAvance,
  tiposInscripcion,
  tiposAutenticacion,
];