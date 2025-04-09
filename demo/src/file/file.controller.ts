import { Controller, Post, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { Body } from '@nestjs/common';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  // 为了解决返回类型无法命名的问题，需要明确指定返回类型
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('userAccount') userAccount: string): Promise<any> { // 修改为用户账号
    return this.fileService.handleUpload(file, userAccount);
  }

  @Get('list')
  // 为了解决返回类型无法命名的问题，需要明确指定返回类型
  async getFileList(): Promise<any> {
    return this.fileService.getFiles();
  }
}