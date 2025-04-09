import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

interface FileInfo {
  id: string;
  name: string;
  size: number;
  path: string;
  uploadTime: Date;
  userAccount: string; // 修改为用户账号
}

@Injectable()
export class FileService {
  private readonly uploadDir = join(__dirname, '../../uploads');
  private files: FileInfo[] = [];

  constructor() {
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async handleUpload(file: Express.Multer.File, userAccount: string) { // 修改参数名为用户账号
    const allowedExtensions = ['.pdf', '.docx'];
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      throw new Error('不支持的文件类型，请上传PDF或DOCX文件。');
    }
    const fileId = uuidv4();
    const filePath = join(this.uploadDir, fileId);
    
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    writeStream.end();

    const fileInfo: FileInfo = {
      id: fileId,
      name: file.originalname,
      size: file.size,
      path: filePath,
      uploadTime: new Date(),
      userAccount: userAccount // 修改为用户账号
    };

    this.files.push(fileInfo);
    return fileInfo;
  }

  getFiles(): FileInfo[] {
    return this.files;
  }
}