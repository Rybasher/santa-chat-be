import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SantaService } from '../santa/santa.service';
import { Logger } from '@nestjs/common';
@WebSocketGateway({ cors: { origin: '*' }, namespace: '/' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  constructor(private readonly santaService: SantaService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { sessionId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { sessionId, message } = data;
    try {
      const responseStream =
        await this.santaService.generateSantaResponseStream(sessionId, message);
      this.server.to(client.id).emit('santa-response-start', 'Stream started');
      for await (const chunk of responseStream) {
        this.server.to(client.id).emit('chatResponse', chunk.content);
      }

      this.server.to(client.id).emit('santa-response-end', 'Stream ended');
    } catch (err) {
      this.logger.log('Error while processing stream:', err);
      this.server.to(client.id).emit('santa-response-error', {
        message: 'An error occurred while processing your message.',
        error: err.message,
      });

      this.server
        .to(client.id)
        .emit('santa-response-end', 'Stream ended due to error');
    }
  }
}
