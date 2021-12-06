import { gql } from 'apollo-server-express';

const tiposUsuario = gql`
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
  }
  type Query {
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
    Estudiante: [Usuario]
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
    ): Usuario
    editarUsuario(
      _id: String!
      nombre: String
      apellido: String
      identificacion: String
      correo: String
      estado: Enum_EstadoUsuario
    ): Usuario
    editarEstudiante(
      _id: String!
      rol: String!
      estado: Enum_EstadoUsuario

    ):Usuario
    eliminarUsuario(_id: String, correo: String): Usuario
  }
`;

export { tiposUsuario };