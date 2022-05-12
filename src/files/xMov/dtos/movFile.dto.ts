import { ArgsType, Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MovFile } from '../entities/movFile.entity';

/**
 * @description 영상 정보 조회용 입력 타입
 * @param "keyId, fileName"
 * @summary
 */
@ArgsType()
@InputType()
export class GetMovFileInput {
  @Field(() => Number)
  keyId?: number;

  @Field(() => String)
  fullNo?: string;

  @Field(() => String)
  frontNo?: string;

  @Field(() => String)
  endNo?: string;
}
/**
 * @description 영상 정보 조회 리턴
 * @return 영상 정보 클래스
 * @summary
 */
@ObjectType()
export class GetMovFileOutput extends CoreOutput {
  @Field(() => MovFile, { nullable: true })
  movFile?: MovFile;
}
/**
 * @description 영상 정보 조회 리스트 리턴
 * @param 영상 정보 클래스 리스트
 * @summary
 */
@ObjectType()
export class GetMovFilesOutput extends CoreOutput {
  @Field(() => [MovFile], { nullable: true })
  movFiles?: MovFile[] | null;
}
/**
 * @description 영상 정보 생성 수행결과 리턴
 * @param 영상 정보 클래스, 업로드 파일 클래스
 * @summary
 */
@ArgsType()
@InputType()
export class CreateMovFileInput extends PickType(MovFile, [
  'fullNo',
  'frontNo',
  'endNo',
  'movQuality',
  'remarks',
  'uploadFile',
]) {}
/**
 * @description 영상 정보 생성 수행결과 리턴
 * @param 영상 정보 클래스
 * @summary
 */
@ObjectType()
export class CreateMovFileOutput extends CoreOutput {
  @Field(() => MovFile, { nullable: true })
  movFile?: MovFile;
}
/**
 * @description 영상 정보 업데이트 수행결과 리턴
 * @param 영상정보 클래스
 * @summary
 */
@InputType()
export class UpdateMovFileInput extends PartialType(PickType(MovFile, ['keyId', 'movQuality', 'remarks'])) {}
@ObjectType()
export class UpdateMovFileOutput extends CoreOutput {
  @Field(() => MovFile, { nullable: true })
  movFile?: MovFile;
}