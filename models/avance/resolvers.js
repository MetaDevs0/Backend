import { AvanceModelo } from './avance.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await AvanceModelo.find().populate('proyecto').populate('realizadoPor');
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await AvanceModelo.find({ proyecto: args._id })
        .populate('proyecto')
        .populate('realizadoPor');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = AvanceModelo.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        realizadoPor: args.realizadoPor,
      });
      return avanceCreado;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await AvanceModelo.findByIdAndUpdate(
        args._id,
        { fecha: args.fecha,
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          realizadoPor: args.realizadoPor,
          observaciones: args.observaciones, 
        },
        { new: true }
      );
      return avanceEditado;
    },
    agregarObservacion: async( parent, args) => {
      const avanceConObservacion = await AvanceModelo.findByIdAndUpdate(
        args._id,
        {
          $addToSet:{
            observacion : args.observacion
          },
        },
        {new: true}
      );
      return avanceConObservacion;
    },
  },
};

export { resolversAvance };