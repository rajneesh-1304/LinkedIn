import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { PostService } from "./post.service";
import { productImageStorage } from "src/infra/multer/multer";

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(
    FilesInterceptor('images', 5, { storage: productImageStorage })
  )
  @Post('createpost/:id')
  createPost(
    @Param('id') id: string,
    @Body() data: any,
    @UploadedFiles() files?: Express.Multer.File[], 
  ) {

    return this.postService.createPost(id, data, files);
  }

  @Get('getPost/:id')
  getPost(@Param() id:string){
    return this.postService.getPosts(id);
  }

  @Patch('like/:id')
  addLike(@Param() id: any, @Body() userId: any){
    return this.postService.toggleLike(id, userId);
  }

  @Patch('comment/:id')
  addComment(@Param() id: string, @Body() data: any){
    return this.postService.addComment(id, data);
  }

  @Post('repost/:id')
  addRepost(@Param() id: string, @Body() userId: any){
    console.log(id, userId.userId)
    return this.postService.addRepost(id, userId.userId);
  }

  // @Get('like/total/:id')
  // getTotalLikes(@Param() id: string){
  //   return this.postService.getTotalLikes(id);
  // }

  // @Get('comment/total/:id')
  // getTotalComments(@Param() id: string){
  //   return this.postService.getTotalComments(id);
  // }

  // @Get('postComment/:id')
  // getComments(@Param() id: string){
  // return this.postService.getComments(id); 
  // }

  // @Get('isLiked/:id')
  // isLiked(@Param() id: string, @Body() userId: string){
  //   return this.postService.isLiked(id, userId);
  // }
}