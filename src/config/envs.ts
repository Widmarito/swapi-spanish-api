import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();
console.log(process.env);
interface EnvVars {
  ENVIRONMENT: string;
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PORT: number;
}

const envsSchema = joi.object({
  ENVIRONMENT: joi.string(),
  PORT: joi.number(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
});

const { error, value } = envsSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbName: envVars.DB_NAME,
  environment: envVars.ENVIRONMENT,
  // awsAccesKey: envVars.ACCESS_KEY,
  // awsSecretKey: envVars.SECRET_KEY,
  // awsRegion: envVars.REGION,
};
