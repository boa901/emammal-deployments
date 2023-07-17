/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';

dotenv.config();

export const nextJSDomain = process.env.NEXTJS_DOMAIN;
export const pgConnectionString = process.env.PG_CONNECTION_STRING;
