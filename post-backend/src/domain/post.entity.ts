import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from "./like.entity";
import { Comment } from "./comment.entity";
import { Repost } from "./repost.entity";

@Entity("Post")
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    text: string;

    @Column("simple-array", { nullable: true })
    image: string[];

    @Column()
    userId: string;

    @OneToMany(() => Like, like => like.post)
    likes: Like[];

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(()=>Repost, repost => repost.post)
    repost: Repost[];
}