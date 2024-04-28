import { Controller, Post, Body } from '@nestjs/common'
import type { Request } from 'express'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipes'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
interface IRequest extends Request {
  user: {
    sub: string
  }
}

const createQuestionBodySchema = z.object({
  title: z.string(),

  content: z.string(),
})
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionsController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user
    const { content, title } = body

    await this.createQuestion.execute({
      title,
      content,

      authorId: userId,
      attachmentsIds: [],
    })
  }
}
