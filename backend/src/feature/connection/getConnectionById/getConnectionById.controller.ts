import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt.guard';
import { GetConnectionByIdService } from './getConnectionById.service';


@Controller('connection')
export class GetConnectionByIdController {
    constructor(private readonly getConnectionByIdService: GetConnectionByIdService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getConnectionById(
        @Param('id') id: string,
    ) {
        return this.getConnectionByIdService.getConnectionById(id);
    }

}



