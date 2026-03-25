import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("Notification")
export class Notification{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    type: string;

    @Column()
    message: string;

    @Column()
    receiverId: string;
    
    @Column()
    senderId: string;

    @Column()
    senderName: string;

    @Column({nullable: true})
    senderImage: string;

    @Column({default: false})
    isSeen: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}