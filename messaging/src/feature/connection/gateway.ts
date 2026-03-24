import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import { Message } from 'src/domain/entity/message';
import { UnauthorizedException } from '@nestjs/common';

interface AuthenticatedSocket extends Socket {
  data: {
    userid?: string;
  };
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const cookies = cookie.parse(client.handshake.headers.cookie || '');
      const token = cookies.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.decode(token);
      if(!payload){
        throw new UnauthorizedException('User is not authorized');
      }

      const userid = payload.sub;

      client.data.userid = userid;

      await client.join(userid);

      this.server.emit('userOnline', { userid });
    } catch (err: any) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    const userid = client.data.userid;

    if (!userid) return;

    const sockets = await this.server.in(userid).fetchSockets();

    if (sockets.length === 0) {
      this.server.emit('userOffline', { userid });
    }
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    await client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    await client.leave(roomId);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    const { roomId, userid } = data;
    client.to(roomId).emit('usertyping', { userid });
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() data: any) {
    try {

      const { roomId, senderId, receiverId, text } = data;
      if (!roomId || !senderId || !receiverId || !text) {
        return;
      }
      const message = this.messageRepository.create({
        roomId,
        senderId,
        receiverId,
        message: text,
      });

      const savedMessage = await this.messageRepository.save(message);

      this.server.to(roomId).emit('newMessage', savedMessage);
    } catch (err: any) {
    }
  }

  @SubscribeMessage('fetchMessages')
  async fetchMessages(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      const messages = await this.messageRepository.find({
        where: { roomId },
        order: { createdAt: 'ASC' },
      });

      client.emit('getMessages', messages);
    } catch (err: any) {
      
    }
  }
}