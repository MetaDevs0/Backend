import { UsuarioModelo } from '../../models/usuario/usuario.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UsuarioModelo.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });
      console.log('usuario creado', usuarioCreado);
      return {
        token: generateToken({
          _id: usuarioCreado._id,
          nombre: usuarioCreado.nombre,
          apellido: usuarioCreado.apellido,
          identificacion: usuarioCreado.identificacion,
          correo: usuarioCreado.correo,
          rol: usuarioCreado.rol,
        }),
      };
    },

    login: async (parent, args) => {
      const usuarioEcontrado = await UsuarioModelo.findOne({ correo: args.correo });
      if (await bcrypt.compare(args.password, usuarioEcontrado.password)) {
        return {
          token: generateToken({
            _id: usuarioEcontrado._id,
            nombre: usuarioEcontrado.nombre,
            apellido: usuarioEcontrado.apellido,
            identificacion: usuarioEcontrado.identificacion,
            correo: usuarioEcontrado.correo,
            rol: usuarioEcontrado.rol,
          }),
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      console.log('contexto', context);
      if (!context.userData) {
        return {
          error: 'token no valido',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
          }),
        };
      }

    },

    cambioContrasena: async(parent,args) => {
    const usuarioEcontrado = await UsuarioModelo.findOne({ _id: args._id });
    if (await bcrypt.compare(args.password, usuarioEcontrado.password)){
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(args.newPassword, salt);
        const contraCambiada = await UsuarioModelo.findByIdAndUpdate({_id : args._id}, 
        {
        password : hashedNewPassword,
        }
        )   
        return {
            token: generateToken({
              _id: contraCambiada._id,
              nombre: contraCambiada.nombre,
              apellido: contraCambiada.apellido,
              identificacion: contraCambiada.identificacion,
              correo: contraCambiada.correo,
              rol: contraCambiada.rol,
            }),
          };        
     }

    }
  },
};

export { resolversAutenticacion };