import { Controller, Get, Post, Body, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request } from 'express';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request){
    return {
      data: req.user
    };
  }

  @Post("signup")
  @UsePipes(ValidationPipe)
  signup(@Body() userDetails: CreateUserDto){
    return this.authService.register(userDetails);
  }






  @Get("status")
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'CLIENT')
  getStatus(@Req() req){
      console.log("inside authcontroller getStatus()");
      console.log(req.user)
      return req.user;
  }
  
}
