import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpApiDocs } from './utils/swagger';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LoggerService));
  app.enableCors({
    origin: "*",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept"
  })
  setUpApiDocs(app);
  await app.listen(3000);
}
void bootstrap();
