import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from '../api/api.module';

export const setUpApiDocs = (app: INestApplication) => {
  const apiOptions = new DocumentBuilder().setTitle('バイヤー君　API').build();

  const api = SwaggerModule.createDocument(app, apiOptions, {
    include: [ApiModule],
  });

  SwaggerModule.setup('docs', app, api);
};
