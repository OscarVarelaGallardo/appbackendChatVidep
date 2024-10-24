
// Importar el módulo de MySQL
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',    // Cambia esto si tu base de datos está en otro servidor
    user: 'root',         // Tu usuario de MySQL
    password: 'Zipper20051607$', // Tu contraseña de MySQL
    database: 'mydatabase' // El nombre de tu base de datos
});



export default connection;