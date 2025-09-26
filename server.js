const express = require('express');
const path = require('path');

//const firebaseRoutes = require('./routes/firebase/firebaseRoutes');
const sqlRoutes = require('./routes/mysql/sqlRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

//app.use('/nosql', firebaseRoutes);
app.use('/sql', sqlRoutes); // todo lo que este aqui inicie por (sql/) y lo que no es (nosqul/)


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});