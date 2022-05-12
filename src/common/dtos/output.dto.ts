import { Field, ObjectType } from '@nestjs/graphql';

/**
 * @description
 * @param
 * @summary
 */
@ObjectType()
export class CoreOutput {
  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  flag?: string;

  @Field(() => Boolean)
  status: boolean;
}
