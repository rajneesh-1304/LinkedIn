import { Module } from "@nestjs/common";
import { OutboxService } from "./outbox.service";
import { PublisherService } from "../rabbitMq/publisher";
import { RabbitConnection } from "../rabbitMq/rabbit.connection";

@Module({
  providers: [OutboxService, PublisherService, RabbitConnection],
  exports: [OutboxService, ],
})
export class OutboxModule {}