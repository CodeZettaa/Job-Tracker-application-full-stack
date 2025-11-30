import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private users: User[] = [];
  private readonly saltRounds = 10;

  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
    // Check if user already exists
    const existingUser = this.users.find(
      (user) => user.email === registerDto.email.toLowerCase(),
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, this.saltRounds);

    // Create user
    const user: User = {
      id: uuidv4(),
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
    const user = this.users.find(
      (u) => u.email === loginDto.email.toLowerCase(),
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async validateUser(userId: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email.toLowerCase()) || null;
  }
}

