import { UsuarioModelo } from './usuario.js';

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      console.log('parent usuario', parent);
      const usuarios = await UsuarioModelo.find();
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UsuarioModelo.findOne({ _id: args._id });
      return usuario;
    },
    Estudiante: async(parent, args) =>{
      const estudiantes = await UsuarioModelo.find({rol: "ESTUDIANTE"});
      return estudiantes
    }
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UsuarioModelo.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UsuarioModelo.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },

    editarEstudiante: async(parent,args) =>{
      if( args.rol === "ESTUDIANTE"){
        const estudianteEditado = await UsuarioModelo.findByIdAndUpdate(
          args._id, 
            {
              estado:args.estado
            },
            {new: true}        
            );
            return estudianteEditado;
      }
    
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UsuarioModelo.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UsuarioModelo.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };