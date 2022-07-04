import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpApiDocs } from './utils/swagger';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LoggerService));
  setUpApiDocs(app);
  await app.listen(3000);
}
void bootstrap();
