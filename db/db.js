import mongoose from 'mongoose';

const conectarBD = async () => {
    return await mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('Conexion exitosa');
      })
      .catch((e) => {
        console.error('Error conectandose a la base de datos', e);
      });
  };
  
  export default conectarBD;