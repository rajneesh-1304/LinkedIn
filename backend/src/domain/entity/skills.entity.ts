import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('skills')
export class Skills {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    skill: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => User, (user) => user.skills)
    users: User[];
}