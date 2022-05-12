import { ArgsType, Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

/**
 * @description
 * @param
 * @summary
 */
@InputType()
export class CreateUserInput extends PickType(User, ['userId', 'userName', 'email']) {}
/**
 * @description
 * @param
 * @summary
 */
@ObjectType()
export class CreateUserOutput extends CoreOutput {}
/**
 * @description
 * @param
 * @summary
 */
@ArgsType()
export class GetUserInput {
  @Field(() => Number)
  userId: number;
}
/**
 * @description
 * @param
 * @summary
 */
@ObjectType()
export class GetUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
