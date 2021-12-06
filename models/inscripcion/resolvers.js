import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find().populate('proyecto').populate('estudiante');
      return inscripciones;
    },
    InscripcionesFilt: async(parent, args) => {
      const InscripProyecto = await InscriptionModel.find({proyecto: args.proyecto});
      return InscripProyecto;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    editarInscripcion: async(parent,args) =>{
      const InscripEditada = await InscriptionModel.findOneAndUpdate({proyecto: args.proyecto, _id: args._id},
        {
        estado: args.estado,
      },
      {new : true}
      );
      return InscripEditada
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
        args._id,
        {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    terminarInscripcion: async(parent,args)=>{
      const terminarInscripcion = await InscriptionModel.findByIdAndUpdate(
        args._id,
        {
          fechaEgreso: Date.now(),
        },
        { new : true }
      );
      return terminarInscripcion;
    }
  },
};

export { resolverInscripciones };