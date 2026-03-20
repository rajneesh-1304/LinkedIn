import { Injectable } from "@nestjs/common";
import { Outbox } from "src/domain/entity/outbox.entity";
// import { Outbox } from "src/domain/entity/outbox.entity";
import { DataSource } from "typeorm";

@Injectable()
export class OutboxService {
  constructor( private readonly dataSource: DataSource
  ) {}

  async getPendingMsg() {
    const outboxRepo = this.dataSource.getRepository(Outbox);
    const pendingMsg = await outboxRepo.find({where: {status:"PENDING"}});
    return pendingMsg;
  }

  async markDispatched(id: any) {
    const outboxRepo = this.dataSource.getRepository(Outbox);
    await outboxRepo.update(id, { status: 'COMPLETED' });
  }
}
