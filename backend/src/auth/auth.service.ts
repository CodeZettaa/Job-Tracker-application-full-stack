import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: registerDto.email.toLowerCase(),
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, this.saltRounds);

    // Create user
    const user = new this.userModel({
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
    });

    await user.save();

    // Generate JWT token
    const payload = { sub: user._id.toString(), email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Return user without password
    const userObject = user.toObject() as any;
    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: userObject.createdAt || new Date(),
        updatedAt: userObject.updatedAt || new Date(),
      } as any,
      accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: Omit<User, 'password'>; accessToken: string }> {
    const user = await this.userModel.findOne({
      email: loginDto.email.toLowerCase(),
    });

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
    const payload = { sub: user._id.toString(), email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Return user without password
    const userObject = user.toObject() as any;
    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: userObject.createdAt || new Date(),
        updatedAt: userObject.updatedAt || new Date(),
      } as any,
      accessToken,
    };
  }

  async validateUser(userId: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() });
  }
}

