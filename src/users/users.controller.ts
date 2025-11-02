import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user.signup.dto';
import { promises } from 'dns';
import { UserEntity } from './entities/user.entity';
import { sign } from 'jsonwebtoken';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utilty/decorators/current-user.decorator';
import { type Request } from 'express';
import { AuthenticationGuard } from 'src/utilty/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utilty/decorators/authorize-roles.decorator';
import { Role } from 'src/utilty/comman/user-role.enum';
import { AuthorizeGuard } from 'src/utilty/guards/authorized.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: UserSignUpDto): Promise<{ user: UserEntity }> {
    return await this.usersService.signup(body);
  }
  @Post('signin')
  async signin(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<{ accessToken: string; user: UserEntity }> {
    console.log('object');
    const user = await this.usersService.signin(userSignInDto);
    if (!user) throw new BadRequestException('Invalid crediantials');
    const accTok = await this.usersService.genAccessToken(user);
    return {
      accessToken: accTok,
      user,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'hi';
  }
  @Get('all')
  @AuthorizeRoles(Role.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async findAll(): Promise<UserEntity[] | []> {
    // console.log(req);
    // Object.assign
    return await this.usersService.findAll();
  }

  // @Get(':id')
  findOne(id: number) {
    console.log(id, typeof id);
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('me')
  @UseGuards(AuthenticationGuard)
  getProfile(@CurrentUser() curUser: UserEntity) {
    return curUser;
  }
}
