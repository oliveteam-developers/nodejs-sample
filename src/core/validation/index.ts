import {validate as classValidate, ValidationOptions} from 'class-validator'

export async function validate<T>(entity: T, options?: ValidationOptions): Promise<T> {
  const results = await classValidate(entity as any, options);
  return entity;
}