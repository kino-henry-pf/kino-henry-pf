import * as Joi from 'joi';
import { EnvironmentVariables } from './environment.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface ConfigType {
  env: EnvironmentVariables;
  database: TypeOrmModuleOptions;
}

export const configSchema = Joi.object({
  PORT: Joi.number().default(3000),
  ORIGIN: Joi.string().default('http://localhost:5173'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.number().valid(0, 1).default(0),
  DB_DROP: Joi.number().valid(0, 1).default(0),
  CLOUD_NAME: Joi.string().required(),
  CLOUD_KEY: Joi.string().required(),
  CLOUD_SECRET: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  SUPABASE_URL: Joi.string().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_SERVICE_ROLE: Joi.string().required(),
  AUTH_GOOGLE_CLIENT_ID: Joi.string().required(),
  AUTH_GOOGLE_CLIENT_SECRET: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  DEV_FRONT_URL: Joi.string().required(),
  DEV_BACK_URL: Joi.string().required(),
  PROD_BACK_URL: Joi.string().required(),
  PROD_FRONT_URL: Joi.string().required(),
  OUTLOOK_EMAIL: Joi.string().required(),
  OUTLOOK_PASSWORD: Joi.string().required(),
});
