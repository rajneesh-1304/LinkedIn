// import {
//   ConnectedSocket,
//   MessageBody,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
// import * as cookie from 'cookie';
// import { Message } from 'src/domain/entity/message';
// import { UnauthorizedException } from '@nestjs/common';
// import { credential } from 'firebase-admin';
// import { Notification } from 'src/domain/entity/notification.entity';

// interface AuthenticatedSocket extends Socket { 
//     data:{
//         userid?: string;
//     }
// }

// @WebSocketGateway({
//     cors: {
//         origin: 'http://localhost:3000',
//         credential: true
//     }
// })
// export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     constructor(
//         @InjectRepository(Notification)
//         private readonly notificationRepo: Repository<Notification>,
//         private readonly jwtService: JwtService,
//     ){}

//     @WebSocketServer()
//     server: Server;

//     async handleConnection(client: AuthenticatedSocket) {
//         try {
//             const cookies = cookie.parse(client.handshake.headers.cookie || "");
//             const token = cookies.token;

//             if(!token){
//                 client.disconnect();
//                 return;
//             }

//             const payload = this.jwtService.decode(token);
//             if(!payload){
//                 throw new UnauthorizedException('User is not authorized');
//             }

//             const userid = payload.sub;
//             client.data.userid = userid;

//             await client.join(userid);
//             this.server.emit('connected', {userid});
//         } catch (error) {
//             client.disconnect();           
//         }
//     }

//     async handleDisconnect(client: AuthenticatedSocket) {
//         const userid = client.data.userid;

//         if(!userid) return;
//         const sockets = await this.server.in(userid).fetchSockets();
//         if(sockets.length === 0){
//             this.server.emit('disconnected', {userid});
//         }
//     }

//     @SubscribeMessage('notification')
//     async getNotification(@MessageBody() data: any, @ConnectedSocket() client:AuthenticatedSocket)
//     {
//         const { receiverId } = data;
//         client.
//     }

// }