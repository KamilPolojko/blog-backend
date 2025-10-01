import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClientModule } from './user-client/client.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { AuthModule } from './auth/auth.module';
import * as passport from 'passport';
import { NodeMailerModule } from './node-mailer/node-mailer.module';
import { ArticleModule } from './article-client/article.module';
import { NotificationModule } from './notification/notification.module';
import { LikeModule } from './article-client/like/like.module';
import { CommentModule } from './article-client/comment/comment.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const clientConfig = new DocumentBuilder()
    .setTitle('Clothes shop for client')
    .setDescription('Clothes Shop API for clients')
    .setVersion('1.0')
    .addTag('Client')
    .addBearerAuth()
    .build();

  const clientDocument = SwaggerModule.createDocument(app, clientConfig, {
    include: [
      ClientModule,
      AuthModule,
      NodeMailerModule,
      ArticleModule,
      LikeModule,
      CommentModule,
      NotificationModule,
    ],
  });

  SwaggerModule.setup('api/docs/client', app, clientDocument);

  const adminConfig = new DocumentBuilder()
    .setTitle('Clothes shop for admin')
    .setDescription('Clothes Shop API for admin')
    .setVersion('1.0')
    .addTag('Admin')
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AppModule],
  });

  SwaggerModule.setup('api/docs/admin', app, adminDocument);

  await app.listen(3000);
}
bootstrap();
