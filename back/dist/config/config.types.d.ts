import * as Joi from 'joi';
import { EnvironmentVariables } from './environment.config';
export interface ConfigType {
    env: EnvironmentVariables;
}
export declare const configSchema: Joi.ObjectSchema<any>;
