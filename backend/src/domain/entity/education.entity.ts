import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('education')
export class Education {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    instituteName: string;

    @Column()
    degreeName: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column({nullable: true})
    Grade: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>User, (user) => user.education)
    user: User;

}