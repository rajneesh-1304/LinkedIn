import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, Column } from "typeorm";
import { User } from "./user.entity";

@Entity('follow')
export class Follow {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followerId' })
    follower: User;

    @Column()
    followerId: string;

    @CreateDateColumn()
    createdAt: Date;
}