import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, IsNull } from "typeorm";
import { Comment } from "src/domain/comment.entity";
import { Like } from "src/domain/like.entity";
import { Post } from "src/domain/post.entity";
import { Repost } from "src/domain/repost.entity";
import axios from 'axios';

@Injectable()
export class PostService {
  constructor(private readonly dataSource: DataSource) { }

  async createPost(id: string, data: any, files: Express.Multer.File[]) {
    const postRepo = this.dataSource.getRepository(Post);

    const imageUrls = files?.map(
      (file) => `http://localhost:3002/uploads/${file.filename}`
    ) || [];

    const post = postRepo.create({
      text: data.text,
      image: imageUrls.length > 0 ? imageUrls : null,
      userId: id,
    });

    await postRepo.save(post);

    return { message: "Post created successfully" };
  }

  // async getPosts(userId: any) {
  //   const postRepo = this.dataSource.getRepository(Post);
  //   const likeRepo = this.dataSource.getRepository(Like);
  //   const commentRepo = this.dataSource.getRepository(Comment);
  //   const repostRepo = this.dataSource.getRepository(Repost);

  //   const posts = await postRepo.find();

  //   const reposts = await repostRepo.find({
  //     relations: ["post"]
  //   });

  //   const postFeed = await Promise.all(
  //     posts.map(async (post) => {

  //       const likesCount = await likeRepo.count({
  //         where: { post: { id: post.id } }
  //       });

  //       const comments = await commentRepo.find({
  //         where: { post: { id: post.id } }
  //       });

  //       const nestedComments = await this.buildNestedComments(comments);

  //       const isLiked = await likeRepo.findOne({
  //         where: { post: { id: post.id }, userId: userId.id }
  //       });

  //       const repostCount = await repostRepo.count({
  //         where: { post: { id: post.id } }
  //       });

  //       const isReposted = await repostRepo.findOne({
  //         where: { post: { id: post.id }, userId: userId.id }
  //       });

  //       return {
  //         type: "post",
  //         ...post,
  //         likesCount,
  //         commentsCount: nestedComments.length,
  //         comments: nestedComments,
  //         repostCount,
  //         isLiked: !!isLiked,
  //         isReposted: !!isReposted,
  //         createdAt: post.createdAt
  //       };
  //     })
  //   );

  //   const repostFeed = reposts.map((repost) => ({
  //     type: "repost",
  //     id: repost.id,
  //     userId: repost.userId,
  //     repostedBy: repost.repostedBy,
  //     post: repost.post,
  //     createdAt: repost.createdAt
  //   }));

  //   const feed = [...postFeed, ...repostFeed];

  //   feed.sort((a, b) =>
  //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   );

  //   return feed;
  // }

async getPosts(userId: any) {
  const postRepo = this.dataSource.getRepository(Post);
  const likeRepo = this.dataSource.getRepository(Like);
  const commentRepo = this.dataSource.getRepository(Comment);
  const repostRepo = this.dataSource.getRepository(Repost);

  try {
    const response = await axios.get('http://backend:3001/profile/getAll');
    const users = response.data.user;

    const userMap = new Map();
    users.forEach((u: any) => {
      userMap.set(u.id, u);
    });
    
    const posts = await postRepo.find();
    const reposts = await repostRepo.find({
      relations: ["post"]
    });

    const postFeed = await Promise.all(
      posts.map(async (post) => {

        const likesCount = await likeRepo.count({
          where: { post: { id: post.id } }
        });

        const comments = await commentRepo.find({
          where: { post: { id: post.id } }
        });

        const nestedComments = await this.buildNestedComments(comments);

        const isLiked = await likeRepo.findOne({
          where: { post: { id: post.id }, userId: userId.id }
        });

        const repostCount = await repostRepo.count({
          where: { post: { id: post.id } }
        });

        const isReposted = await repostRepo.findOne({
          where: { post: { id: post.id }, userId: userId.id }
        });

        return {
          type: "post",
          ...post,
          user: userMap.get(post.userId) || null,
          likesCount,
          commentsCount: nestedComments.length,
          comments: nestedComments,
          repostCount,
          isLiked: !!isLiked,
          isReposted: !!isReposted,
          createdAt: post.createdAt
        };
      })
    );

    const postMap = new Map();
    postFeed.forEach((p) => {
      postMap.set(p.id, p);
    });

    const repostFeed = reposts.map((repost) => ({
      type: "repost",
      id: repost.id,
      userId: repost.userId,
      user: userMap.get(repost.userId) || null,
      repostedBy: repost.repostedBy,

      originalPost: postMap.get(repost.post.id) || null,

      createdAt: repost.createdAt
    }));

    const feed = [...postFeed, ...repostFeed];

    feed.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return feed;

  } catch (error) {
    throw error;
  }
}


  private async buildNestedComments(comments: Comment[], parentId: string = null) {
    const filtered = comments.filter(c => c.parentId === parentId);

    const result = await Promise.all(
      filtered.map(async (comment) => ({
        id: comment.id,
        userId: comment.userId,
        comment: comment.comment,
        createdAt: comment.createAt,
        replies: await this.buildNestedComments(comments, comment.id),
      }))
    );

    return result;
  }

  async addComment(id: any, data: any) {
    const commentRepo = this.dataSource.getRepository(Comment);
    const postRepo = this.dataSource.getRepository(Post);
    const post = await postRepo.findOne({ where: { id: id.id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const wordCount = data.data.text.trim().split(/\s+/).length;

    if (wordCount > 20) {
      throw new ForbiddenException('Comments cannot be more than 20 words');
    }
    if(!data.data.userId){
      throw new NotFoundException('User id is not present');
    }
    const comment = commentRepo.create({
      userId: data.data.userId,
      comment: data.data.text,
      post,
      parentId: data.data.parentId ?? null,
    })

    await commentRepo.save(comment);
    return { message: 'Added Comment' };
  }

  async toggleLike(postId: any, userId: any,) {
    const likeRepo = this.dataSource.getRepository(Like);
    const postRepo = this.dataSource.getRepository(Post);
    if (!userId.userId) {
      throw new NotFoundException('User is not present');
    }

    const post = await postRepo.findOne({ where: { id: postId.id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingLike = await likeRepo.findOne({
      where: { post: { id: postId.id }, userId: userId.userId },
    });

    if (existingLike) {
      await likeRepo.remove(existingLike);
      return { message: 'Like removed', liked: false };
    }

    const like = likeRepo.create({
      userId: userId.userId,
      post,
    });
    await likeRepo.save(like);

    return { message: 'Post liked', liked: true };
  }

  async addRepost(id: any, userId: any,  name: any) {
    const postRepo = this.dataSource.getRepository(Post);
    const repostRepo = this.dataSource.getRepository(Repost);
    const post = await postRepo.findOne({ where: { id: id?.id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if(!userId){
      throw new NotFoundException('UserId not found');
    }

    const existingRepost = await repostRepo.findOne({
      where: {
        post: { id: id?.id }, userId: userId
      }
    });
    if (existingRepost) {
      await repostRepo.remove(existingRepost);
      return { message: 'Reposted removed', reposted: false };
    }

    const repost = repostRepo.create({
      post,
      userId: userId,
      repostedBy: name,
    });
    await repostRepo.save(repost);
    return { message: 'Post reposted successfully', reposted: true };
  }
}