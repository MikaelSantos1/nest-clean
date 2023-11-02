import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticationController } from './controllers/authentication.controller'
import { CreateQuestionsController } from './controllers/create-question.controller'
import { JwtStrategy } from './auth/jwt.strategy'
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
