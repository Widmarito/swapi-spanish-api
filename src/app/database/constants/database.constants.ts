import { envs } from 'src/config/envs';

export const DB_CONNECTION = 'DB_CONNECTION';

export const USER = envs.dbUser;
export const PASSWORD = envs.dbPassword;
export const HOST = envs.dbHost;
export const DB = envs.dbName;
export const PORT = envs.dbPort;

// postgres://<user>:<password>@<host>:<port>/<db_name>
export const DATABASE_URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;
