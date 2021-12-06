import { gql } from 'apollo-server-express';

const tiposInscripcion = gql`
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: Usuario!
  }
  type Query {
    Inscripciones: [Inscripcion]
    InscripcionesFilt(proyecto:String!): [Inscripcion]
  }
  type Mutation {
    crearInscripcion(
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    
    editarInscripcion(_id: String!, proyecto: String!, estado: String):Inscripcion

    aprobarInscripcion(_id: String!): Inscripcion
    
    terminarInscripcion(_id:String!):Inscripcion
  }
`;

export { tiposInscripcion };