import keys from './keys';

const { Pool, Client } = require('pg')

const pool = new Pool(keys.database)

export default pool;