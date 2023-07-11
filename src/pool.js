import pg from 'pg';
import dotenv from 'dotenv';
import { pgConnectionString } from '#src/settings';

dotenv.config();

const { Pool } = pg;
const connectionString = encodeURI(pgConnectionString);
const pool = new Pool({ connectionString });

export default pool;
