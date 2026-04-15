import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, {
      abortEarly: false, // Don't stop at the first error, find them ALL.
      allowUnknown: true, // Allow extra fields in the input.
      stripUnknown: true, // Remove extra fields from the input.
    });

    if (error) {
      throw new BadRequestException(
        error.details.map((detail) => detail.message),
      );
    }
    return value;
  }
}
