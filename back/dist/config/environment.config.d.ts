export interface EnvironmentVariables {
    port: number;
    cloudName: string;
    cloudKey: string;
    cloudSecret: string;
}
export declare const environmentVariables: (() => EnvironmentVariables) & import("@nestjs/config").ConfigFactoryKeyHost<EnvironmentVariables>;
