import { AvanceModelo } from './avance.js';
import { InscriptionModel } from '../inscripcion/inscripcion.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await AvanceModelo.find().populate('proyecto').populate('realizadoPor');
      return avances;
    },
    avancesInscrito: async(parent,args)=>{
      let filtro = {}
      const inscripFilt = await InscriptionModel.find({proyecto: args.proyecto});
      const inscripList = inscripFilt.map((p)=>p.estudiante.toString());
      if (args.estudiante in inscripList){
        const projects = inscripList.map((p)=> p.proyecto.toString());
        filtro = {
          proyecto: {
            $in: projects,
          },
      };
    }
    else {
      null
    }  
    const avanceIns = await AvanceModelo.find({...filtro});
    return avanceIns


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
            observaciones : args.observacion
          },
        },
        {new: true}
      );
      return avanceConObservacion;
    },
  },
};

export { resolversAvance };