const mysql = require ('mysql2');
const connection = mysql.createConnnection({
    host: '3306',
    user: 'LUCIA',
    password: 'CodyJunior2',
    database:'PanaderiaPan'
});
connection.connect((error) => {
    if (error) {
      console.error('Error de conexión: ', error);
      return;
    }
    console.log('Conexión exitosa a MySQL');
  });
  
  module.exports = connection;