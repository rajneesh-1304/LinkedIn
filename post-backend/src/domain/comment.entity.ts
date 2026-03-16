import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity("Comment")
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => Post, post => post.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "postId" })
    post: Post;

    @Column({nullable: true})
    parentId: string;

    @Column()
    comment: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}