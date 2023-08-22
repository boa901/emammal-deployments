import mariadb from 'mariadb';
import dotenv from 'dotenv';
import {
  mariadbHost,
  mariadbPort,
  mariadbUser,
  mariadbPassword,
  mariadbDatabase,
} from '#express/settings';

dotenv.config();

const pool = mariadb.createPool({
  host: mariadbHost,
  port: mariadbPort,
  user: mariadbUser,
  password: mariadbPassword,
  database: mariadbDatabase,
});

export default pool;
