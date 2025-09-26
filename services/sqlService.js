const mysql = require('mysql2'); // libreria de mysql
const config = require('../env/mysqlConfig'); 

class SqlConnection{ // La variable que voy a usar
    constructor(){
        this.connection = mysql.createConnection(config); // Cree la conexion alla
        this.isConnected = false; // Flag, Por defecto no esta conectado
    }
    
    connectToDb(){ // ASYNC 
        return new Promise((resolve, reject) => { //Que es una promesa? Resolvio o no resolvio?
            this.connection.connect((err) => { //conectese
                if (err) { //si hay un error no se cumplio la promesa
                    return reject(err);
                }
                console.log('Conexión exitosa a MySQL'); //Resolvio
                this.isConnected = true;
                resolve();
            });
        }); // Es todo esto, la promesa
    }
    
    query(sql, args) { // paso la querie y los argumentos
        return new Promise((resolve, reject) => { //prometeme que vas a intentar hacer la querie
          this.connection.query(sql, args, (err, results) => { 
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
    }
     //Cerrar conexion
    closeConnection() {
        return new Promise((resolve, reject) => { 
          this.connection.end((err) => {
            if (err) {
              return reject(err); //No se pudo
            }
            this.isConnected = false
            resolve(); // Bien!
          });
        });
      }
    
}

module.exports=SqlConnection;