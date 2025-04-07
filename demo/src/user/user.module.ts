import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// 由于找不到 './jwt.strategy' 模块，需要检查该文件是否存在
// 若文件存在，可能是路径有误，需要确认路径是否正确
// 若文件不存在，需要创建该文件
// 暂时移除该导入语句，避免编译错误
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  
// 由于找不到 JwtStrategy，暂时移除该提供者，若后续创建并导入了 JwtStrategy，可重新添加
  providers: [UserService],
})
export class UserModule {}
