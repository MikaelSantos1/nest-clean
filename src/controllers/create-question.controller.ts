import {
  ConflictException,
  Controller,
  Post,
  HttpCode,
  Body,
  UsePipes,
  UnauthorizedException,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import type { Request } from 'express'
interface IRequest extends Request {
  user: {
    sub: string
  }
}
@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionsController {
  @Post()
  async handle(@Req() request: IRequest) {
    console.log(request.user.sub)
    return 'ok'
  }
}
