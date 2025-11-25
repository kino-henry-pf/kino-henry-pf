"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const seeder_service_1 = require("./seeder.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seeder = app.get(seeder_service_1.SeederService);
    await seeder.seed();
    console.log('Seeding complete');
    await app.close();
}
void bootstrap();
//# sourceMappingURL=seed.js.map