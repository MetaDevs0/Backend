import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find().populate('avances').populate('inscripciones');
      return proyectos;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;

    },
    editarProyecto: async(parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          presupuesto: args.presupuesto,
          fechaInicio: args.fechaInicio,
          fechaFin: args.fechaFin,
          estado: args.estado,
          fase: args.fase
        }

      );
      return proyectoEditado;
    },
    eliminarProyecto: async(parent,args) =>{
      const proyectoEliminado = await ProjectModel.findByIdAndDelete(
        args._id
      );
      return proyectoEliminado
    },
    proyectoInactivo: async(parent, args) =>{
      const inactivo = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          estado: "INACTIVO"
        },
        {new: true}
      );
      return inactivo
    },

    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { descripcion: args.descripcion, tipo: args.tipo },
          },
        },
        { new: true }
      );
    },

    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },
  },
};

export { resolversProyecto };