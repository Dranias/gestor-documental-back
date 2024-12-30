import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar el adaptador de WebSocket de NestJS
  app.useWebSocketAdapter(new IoAdapter(app));

  // Configurar CORS para la API REST
  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.103.214:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('APP_PORT');
  const HOST = configService.get<string>('APP_HOST');

  // Iniciar el servidor
  await app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
  });
}

bootstrap();


