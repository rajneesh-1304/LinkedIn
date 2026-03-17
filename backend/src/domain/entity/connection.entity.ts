import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Column,
} from "typeorm";
import { User } from "./user.entity";

export enum ConnectionStatus {
  PENDING = "PENDING",
  CONNECTED = "CONNECTED",
}

@Entity("connection")
export class Connection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.receivedConnections, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => User, (user) => user.sentConnections, { onDelete: "CASCADE" })
  @JoinColumn({ name: "requesterId" })
  requester: User;

  @Column({
    type: "enum",
    enum: ConnectionStatus,
    default: ConnectionStatus.PENDING,
  })
  status: ConnectionStatus;

  @CreateDateColumn()
  createdAt: Date;
}