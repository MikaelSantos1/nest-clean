import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import { ZodObject, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(fromZodError(error))
      }
      throw new BadRequestException('Validation failed')
    }
    return value
  }
}
