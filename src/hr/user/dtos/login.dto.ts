import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

/**
 * @description 로그인 입력값
 * @param 사용자ID, 비밀번호
 * @summary
 */
@InputType()
export class LoginInput extends PickType(User, ['userId', 'password']) {}
/**
 * @description 로그인 수행 결과 반환(토큰)
 * @returns 토큰
 * @summary
 */
@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
