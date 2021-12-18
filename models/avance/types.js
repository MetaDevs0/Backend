import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    realizadoPor: Usuario!
  }
  type Query {
    Avances: [Avance]
    avancesInscrito(proyecto:String!, estudiante:String!): [Avance]
    filtrarAvance(_id: String!): [Avance]
  }
  type Mutation {
    crearAvance(fecha: Date!, descripcion: String!, proyecto: String!, realizadoPor: String!): Avance
    editarAvance(_id: String!, descripcion: String): Avance
    agregarObservacion(_id: String!, observacion: String!): Avance
  }
`;

export { tiposAvance };