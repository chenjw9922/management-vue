import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type UserRole = 'user' | 'admin';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  private users = [
    { id: 1, username: 'test', password: 'test123', role: 'user' as UserRole },
    { id: 2, username: 'admin', password: 'admin123', role: 'admin' as UserRole }
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
      const payload = { 
        sub: validatedUser.id, 
        username: validatedUser.username,
        role: validatedUser.role 
      };
      return {
        access_token: this.jwtService.sign(payload),
        role: validatedUser.role
      };
    }
    return null;
  }

  async findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (user) {
      return {
        id: user.id,
        username: user.username,
        role: user.role
      };
    }
    return null;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
