/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';

dotenv.config();

export const nextJSDomain = process.env.NEXTJS_DOMAIN;
export const mariadbHost = process.env.MARIA_DB_HOST;
export const mariadbPort = process.env.MARIA_DB_PORT;
export const mariadbUser = process.env.MARIA_DB_USER;
export const mariadbPassword = process.env.MARIA_DB_PASSWORD;
export const mariadbDatabase = process.env.MARIA_DB_DATABASE;
