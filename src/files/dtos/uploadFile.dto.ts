import { ArgsType, Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UploadFile } from '../entities/uploadFile.entitiy';

/**
 * @description 업로드 정보 조회용 입력
 * @param "keyId"
 * @summary
 */
@ArgsType()
@InputType()
export class GetUploadFileInput {
  @Field(() => Number)
  keyId?: number;

  @Field(() => String)
  fileName?: string;
}
/**
 * @description 조회 결과 리턴
 * @param 업로드 정보 클래스
 * @summary
 */
@ObjectType()
export class GetUploadFileOutput extends CoreOutput {
  @Field(() => UploadFile, { nullable: true })
  uploadFile?: UploadFile;
}
/**
 * @description 조회 결과 리턴
 * @return 업로드 정보 클래스 리스트
 * @summary
 */
@ObjectType()
export class GetUploadFilesOutput extends CoreOutput {
  @Field(() => [UploadFile], { nullable: true })
  uploadFiles?: UploadFile[] | null;
}
/**
 * @description 업로드 정보 생성 파라미터
 * @param "fileName, fileExt, fileSize"
 * @summary
 */
@InputType()
export class CreateUploadFileInput extends PickType(UploadFile, [
  'fileName',
  'fileExt',
  'fileSize',
]) {}
/**
 * @description 업로드 정보 생성 수행결과
 * @return 업로드 정보 클래스
 * @summary
 */
@ObjectType()
export class CreateUploadFileOutput extends CoreOutput {
  @Field(() => UploadFile, { nullable: true })
  createdUploadFile?: UploadFile;
}
/**
 * @description 업로드 정보 수정 파라미터
 * @param "keyId, fileSize"
 * @summary
 */
@InputType()
export class UpdateUploadFileInput extends PartialType(PickType(UploadFile, ['keyId', 'fileSize'])) {}
/**
 * @description 업로드 정보 업데이트 수행결과 리턴
 * @return 업로드 정보 클래스
 * @summary
 */
@ObjectType()
export class UpdateUploadFileOutput extends CoreOutput {
  @Field(() => UploadFile, { nullable: true })
  updatedUploadFile?: UploadFile;
}