import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { MailService } from '../mail/mail.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ResponseHelper } from '../helpers/response.helper';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger, @InjectRepository(User) private readonly userRepository: Repository<User>, private readonly mailService: MailService, private readonly jwtService: JwtService, private readonly configService: ConfigService
  ){

  }
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email);
    if(existUser){
      this.logger.error("User already exists");
      throw new Error(`User already exists`);
    }

    //create token
    const token = randomUUID();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    

    //handle password
    const hashedPassword = await argon2.hash(createUserDto.password);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      verifyToken: token,
      emailVerifiedExpiry: expiry,
      isEmailVerified: StatusEnum.INACTIVE
    });

     await this.userRepository.save(newUser);

     //send verification email
     await this.mailService.sendVerificationEmail(newUser.email, newUser.name, token);
    this.logger.log("info", `Created user with id: ${newUser.id} successfully`);
    return {success:true, message:'Created user successfully', data:newUser};
  } 

  async verifyEmail(token: string){
    const user = await this.userRepository.findOne({where: {verifyToken: token}});
    if(!user){
      this.logger.error("Email verification failed: invalid verification token - user not found");
      throw new Error(`Email verification failed. User not found`);
    }

    //check if verification token expired
    if(user.emailVerifiedExpiry !== null && user.emailVerifiedExpiry <  new Date()){
      this.logger.error("Verification token expired: token - "+token);
      throw new Error("Verification token expired.");
    }

    //check if email is already verified
    if(user.isEmailVerified){
      return {success:false, message:"Email already verified"};
    }

    user.verifyToken = null;
    user.isEmailVerified = StatusEnum.ACTIVE;
    user.emailVerifiedExpiry = null;
    const savedUser = await this.userRepository.save(user);
    return {success: true, message: "User email verified!"};
  }

  async login(email: string, password: string, res: Response){
    const user = await this.userRepository.findOne({where: {email}});

    if(!user){
      return {success: false, message:'Invalid credentials', status:HttpStatus.UNAUTHORIZED, data:null};
    }

    //verify password
    const isMatch = await argon2.verify(user.password, password);
    if(!isMatch){
      return {success: false, message:'Invalid credentials', status:HttpStatus.UNAUTHORIZED, data:null};
    }

    //generate jwt token
    const payload = {
      id: user.id,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    };

      const token = this.jwtService.sign(payload);

      //set token in http-only cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'strict',
        maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      //return response
      return {success: true, message: 'Login Successful', data: {id: user.id, email: user.email, verifiedEmail:user.isEmailVerified}};

  }

  async logout(res: Response){
    res.clearCookie('access_token');
    return {success: true, message: 'Logout successful', data:null};
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string){
    return await this.userRepository.findOneBy({email});
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
