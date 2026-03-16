import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Education } from "./education.entity";
import { Experience } from "./experience.entity";
import { Follow } from "./follow.entity";
import { Connection } from "./connection.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    headline: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    profilePicture: string;

    @Column({ nullable: true })
    bio: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Education, (education) => education.user)
    education: Education[];

    @OneToMany(() => Experience, (experience) => experience.user)
    experience: Experience[];

    @OneToMany(() => Follow, (follow) => follow.user)
    followers: Follow[];

    @OneToMany(() => Follow, (follow) => follow.follower)
    following: Follow[];

    @OneToMany(() => Connection, (connection) => connection.requester)
    sentConnections: Connection[];

    @OneToMany(() => Connection, (connection) => connection.user)
    receivedConnections: Connection[];
}