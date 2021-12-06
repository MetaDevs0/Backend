import { gql } from 'apollo-server-express';

const tiposProyecto = gql`
  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }
  input crearObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }
  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos: [Objetivo]
    avances: [Avance]
    inscripciones: [Inscripcion]
  }
  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
    ProyectosLiderado(lider:String!): [Proyecto]
  }
  type Mutation {
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      fechaInicio: Date!
      fechaFin: Date!
      lider: String!
      objetivos: [crearObjetivo]
    ): Proyecto

    editarProyecto( 
      _id: String!
      nombre: String
      presupuesto: Float
      fechaFin: String
      fechaInicio: String
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      ): Proyecto

    editarProyectoLider(
      _id:String!
      lider: String!
      nombre: String
      presupuesto: Float
     ):Proyecto  

    eliminarProyecto(_id:String!): Proyecto  
    proyectoInactivo(_id:String!): Proyecto
    crearObjetivo(idProyecto: String!, descripcion: String!, tipo: String!): Proyecto
    editarObjetivo(idProyecto: String!, indexObjetivo: Int!, descripcion: String!, tipo: String!): Proyecto
    eliminarObjetivo(idProyecto: String!, idObjetivo: String!): Proyecto
  }
`;

export { tiposProyecto };