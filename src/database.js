import {createPool} from 'mysql2/promise';

export const pool  = createPool({
    host: 'localHost',
    user: 'root',
    password: 'CodyJunior2',
    database: 'panaderiapan'
})
