import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '0pt1mu5Pr1m3',
    database: 'panaderiapan',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log("Conexión exitosa a la base de datos");
        connection.release();
    })
    .catch(err => {
        console.error("Error en la conexión a la base de datos:", err);
    });
