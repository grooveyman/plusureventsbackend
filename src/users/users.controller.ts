import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import { LoginUserDto } from './dto/login-user.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }


  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const results = await this.usersService.create(createUserDto);
      return ResponseHelper.success(res, 'Successfully created user', HttpStatus.CREATED);
    } catch (err: any) {
      return ResponseHelper.error(res, 'Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }

  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid Credentials' })
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    console.log("entering controller");
    const result = await this.usersService.login(loginUserDto.email, loginUserDto.password, res);
    if (!result.success) {
      return ResponseHelper.error(res, result.message, result.status);
    }
    return ResponseHelper.success(res, result.message, HttpStatus.OK);
  }

  @Get('verifyEmail/:token')
  async verifyEmail(@Res() res: Response, @Param('token') token: string) {
    try {
      const result = await this.usersService.verifyEmail(token);
      if (!result.success) {
        return ResponseHelper.error(res, result.message, HttpStatus.BAD_REQUEST);
      }

      return ResponseHelper.success(res, result.message, null);
    } catch (err: any) {
      return ResponseHelper.error(res, 'Error occurred', HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No records found' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
