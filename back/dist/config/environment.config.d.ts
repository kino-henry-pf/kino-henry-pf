export interface EnvironmentVariables {
    port: number;
}
export declare const environmentVariables: (() => EnvironmentVariables) & import("@nestjs/config").ConfigFactoryKeyHost<EnvironmentVariables>;
