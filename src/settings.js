/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';

dotenv.config();

export const pgConnectionString = process.env.PG_CONNECTION_STRING;
