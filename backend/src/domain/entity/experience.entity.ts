import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('experience')
export class Experience {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    position: string;

    @Column()
    company: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column({nullable: true})
    location: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>User, (user) => user.experience)
    user: User;

}