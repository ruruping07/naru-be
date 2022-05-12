import { ArgsType, Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MappMovActor } from '../entities/mappMovActor.entity';

/**
 * @description 배우, 영상 매핑 테이블 조회
 * @param 각 테이블 Key 값
 * @summary
 */
@ArgsType()
@InputType()
export class GetMappMovActorInput {
  @Field(() => Number)
  keyId?: number;

  @Field(() => Number)
  movKeyId?: number;

  @Field(() => Number)
  actorKeyId?: number;
}
/**
 * @description 배우, 영상 매핑 테이블 조회
 * @return MappMovActor 클래스
 * @summary
*/
@ObjectType()
export class GetMappMovActorOutput extends CoreOutput {
  @Field(() => MappMovActor, { nullable: true })
  movActor?: MappMovActor;
}
/**
 * @description 배우, 영상 매핑 리스트 조회
 * @return MappMovActor 클래스 리스트
 * @summary
*/
@ObjectType()
export class GetMappMovActorsOutput extends CoreOutput {
  @Field(() => [MappMovActor], { nullable: true })
  movActors?: MappMovActor[];
}
/**
 * @description 배우, 영상 매핑 정보 등록
 * @param MappMovActor 클래스
 * @summary
 */
@InputType()
export class CreateMappMovActorInput extends PickType(MappMovActor, ['actor', 'movFile']) {}
/**
 * @description 배우, 영상 매핑 정보
 * @param MappMovActor 클래스
 * @summary
 */
@ObjectType()
export class CreateMappMovActorOutput extends CoreOutput {
  @Field(() => MappMovActor, { nullable: true })
  movActor?: MappMovActor;
}
