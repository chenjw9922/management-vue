import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  private users = [
    { id: 1, username: 'test', password: 'test123' }
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.username, user.password);
    if (validatedUser) {
      const payload = { sub: validatedUser.id, username: validatedUser.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async findOne(id: number) {
    // 这里可以添加查询用户的逻辑
    return { id, username: 'test', password: 'test' };
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
