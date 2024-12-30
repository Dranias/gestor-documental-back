import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://192.168.103.214:5173'], // Define los orígenes permitidos
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true, // Habilita cookies o encabezados de autorización
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketGateway');

  // Método ejecutado al inicializar el gateway
  afterInit(server: Server) {
    this.logger.log('Socket Gateway Inicializado');
  }

  // Método ejecutado al conectar un cliente
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    client.emit('alert', { message: '¡Bienvenido al servidor WebSocket!' });
  }

  // Método ejecutado al desconectar un cliente
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // Ejemplo de un evento WebSocket
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { user: string; message: string }) {
    this.logger.log(`Mensaje recibido de ${data.user}: ${data.message}`);
    // Emitir un mensaje a todos los clientes conectados
    this.server.emit('message', {
      user: data.user,
      message: data.message,
    });
  }

  // Evento personalizado: notificar a los clientes
  notifyClients(event: string, data: any) {
    this.server.emit(event, data); // Emitir evento a todos los clientes
  }
}
