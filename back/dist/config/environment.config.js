"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentVariables = void 0;
const config_1 = require("@nestjs/config");
exports.environmentVariables = (0, config_1.registerAs)('env', () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
}));
//# sourceMappingURL=environment.config.js.map