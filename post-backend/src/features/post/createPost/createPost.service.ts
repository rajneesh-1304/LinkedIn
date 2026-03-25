import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, IsNull } from "typeorm";
import { Post } from "src/domain/post.entity";

@Injectable()
export class CreatePostService {
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
}