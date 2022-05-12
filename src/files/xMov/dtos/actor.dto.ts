import { ArgsType, Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Actor } from '../entities/actor.entitiy';

/**
 * @description 배우 정보 조회용 입력
 * @param "keyId, actorName"
 * @summary
 */
@ArgsType()
@InputType()
export class GetActorInput {
  @Field(() => Number)
  keyId?: number;

  @Field(() => String)
  actorName?: String;
}
/**
 * @description 배우정보 조회 결과
 * @return 배우정보 클래스
 * @summary
 */
@ObjectType()
export class GetActorOutput extends CoreOutput {
  @Field(() => Actor, { nullable: true })
  actor?: Actor;
}
/**
 * @description 배우정보 리스트 조회
 * @return 배우정보 리스트
 * @summary
 */
@ObjectType()
export class GetActorsOutput extends CoreOutput {
  @Field(() => [Actor], { nullable: true })
  actors?: Actor[] | null;
}
/**
 * @description 배우정보 생성 파라미터
 * @param Actor 클래스
 * @summary
 */
@InputType()
export class CreateActorInput extends PickType(Actor, ['actorName', 'actorNameJp', 'actorNameKr', 'isActive', 'yearOfBirth', 'remarks']) {}
/**
 * @description 배우정보 생성 결과
 * @return Actor 클래스
 * @summary
 */
@ObjectType()
export class CreateActorOutput extends CoreOutput {
  @Field(() => Actor, { nullable: true })
  actor?: Actor;
}
/**
 * @description 배우정보 수정 파라미터
 * @param Actor 클래스
 * @summary
 */
@InputType()
export class UpdateActorInput extends PartialType(
  PickType(Actor, ['keyId', 'actorName', 'actorNameJp', 'actorNameKr', 'isActive', 'yearOfBirth', 'remarks']),
) {}
/**
 * @description 배우 정보 수정 결과
 * @return Actor 클래스
 * @summary
 */
@ObjectType()
export class UpdateActorOutput extends CoreOutput {
  @Field(() => Actor, { nullable: true })
  actor?: Actor | null;
}