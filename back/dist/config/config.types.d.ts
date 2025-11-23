import * as Joi from 'joi';
import { EnvironmentVariables } from './environment.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export interface ConfigType {
    env: EnvironmentVariables;
    database: TypeOrmModuleOptions;
}
export declare const configSchema: Joi.ObjectSchema<any>;
