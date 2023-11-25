import * as session from 'express-session'
import * as passport from 'passport'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  //app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  //app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
   app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000']
  });  

  const config = new DocumentBuilder()
    .setTitle('Ваша Мебель')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
