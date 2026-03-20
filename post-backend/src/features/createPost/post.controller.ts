import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { PostService } from "./post.service";
import { productImageStorage } from "src/infra/multer/multer";
import { JwtAuthGuard } from "src/jwt.guard";

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('getPost/:id')
  getPost(@Param() id:string){
    return this.postService.getPosts(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('like/:id')
  addLike(@Param() id: any, @Body() userId: any){
    return this.postService.toggleLike(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('comment/:id')
  addComment(@Param() id: string, @Body() data: any){
    return this.postService.addComment(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('repost/:id')
  addRepost(@Param() id: string, 
  @Body('userId') userId: any,
  @Body('name') name: any,
){
    return this.postService.addRepost(id, userId, name);
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