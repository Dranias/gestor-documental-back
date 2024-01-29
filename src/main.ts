import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.103.214:5173', 'https://gestor-app.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const PORT = configService.get('APP_PORT');
  const HOST = configService.get('APP_HOST')

  await app.listen(PORT, HOST, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

bootstrap();