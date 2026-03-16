// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "../../app.module";

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);

//   const outbox = app.get(OutboxService);
//   const publisher = app.get(PublisherService);

//   const messages = await outbox.getPendingMsg();

//   for (const msg of messages) {
//     await publisher.publish(msg);
//     await outbox.markDispatched(msg.id.toString());
//   }

//   await app.close();
// }
// bootstrap();
