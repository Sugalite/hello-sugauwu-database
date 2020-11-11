// populatedb.js

// necesitamos importar mongoose
const mongoose = require('mongoose');

// importar el modelo de usuario
const User = require('./models/User');

// la URI de la db
const db = 'mongodb+srv://hellodb:1234@cluster0.bt9x9.mongodb.net/hellodatabase?retryWrites=true&w=majority';
// const db = 'mongodb://localhost/hellodb';

// array de usuarios para ingresar a la db
const users = [
  {
    id: 1,
    name: 'Tomas',
    mail: 'tomaselmascapo@mail.com',
    birthday: '2003-04-12'
  },
  {
    id: 2,
    name: 'Marcos',
    mail: 'Marcos_34@mail.com',
    birthday: '2001-03-20'
  },
  {
    id: 3,
    name: 'Ariana',
    mail: 'Ariana_grande@mail.com',
    birthday: '2002-10-05'
  },
  {
    id: 4,
    name: 'Juliana',
    mail: 'juliana_maquillajes@mail.com',
    birthday: '1999-12-25'
  }
];

// conectarse a la db
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    // si nos conectamos con exito mostrar mensajes
    // e insertar los usuarios en el array
    console.log(`DB connected @ ${db}`);
    console.log('Populating DB...');
    User.insertMany(users, (err, users) => {
      if (err) throw err;
      // un mensaje con la cantidad de documentos insertados
      console.log(`${users.length} documents inserted!`);
      // cerramos la conexion cuando terminamos
      mongoose.connection.close();
    });
  })
.catch(err => console.error(`Connection error ${err}`));
