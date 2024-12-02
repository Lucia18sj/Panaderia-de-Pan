import {createPool} from 'mysql2/promise';

export const pool  = createPool({
    host: '192.168.23.23',
    user: 'Ariel',
    password: 'Ariel123',
    database: 'panaderiapan'
})
