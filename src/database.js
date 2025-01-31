import {createPool} from 'mysql2/promise';


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'CodyJunior2',
    database: 'panaderiapan'
})

