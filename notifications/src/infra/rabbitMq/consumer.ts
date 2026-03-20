import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { RabbitConnection } from './rabbit.connection';
import { DataSource } from 'typeorm';
import { Inbox } from 'src/domain/entity/inbox.entity';
import { Notification } from 'src/domain/entity/notification.entity';

@Injectable()
export class ConsumerService {
    constructor(private readonly rabbit: RabbitConnection, private dataSource: DataSource) { }

    async addNotification() {
        const channel = await this.rabbit.connect(process.env.RABBITMQ_URL);
        const repo = this.dataSource.getRepository(Notification);
        const inboxRepo = this.dataSource.getRepository(Inbox);
        await channel.assertExchange('notifications.fanout', 'fanout', {
            durable: true,
        });

        const notificationsQueue = await channel.assertQueue('notifications.queue', { durable: true });
        await channel.bindQueue(notificationsQueue.queue, 'notifications.fanout', 'fanout');
        let d: any = null;


        channel.consume(notificationsQueue.queue, async (msg) => {
            if (!msg) return;

            const data = JSON.parse(msg.content.toString());
            console.log(data)
            const isPresent = await inboxRepo.findOne({ where: { messageId: data.id, handler: data.message.type } });
            if (!isPresent) {
                const inbox = inboxRepo.create({
                    messageId: data.id,
                    handler: data.message.type,
                })
                const notification = repo.create({
                    senderId: data.message.senderId,
                    senderName: data.message.senderName,
                    receiverId: data.message.receiverId,
                    type: data.message.type,
                    message: data.message.message,

                })
                await inboxRepo.save(inbox);
                await repo.save(notification);
            }

            channel.ack(msg);
        });

    }
}