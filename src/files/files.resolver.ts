import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/common.constants';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { ActiveRole } from 'src/auth/activeRole.decorator';
import {
  CreateUploadFileInput,
  CreateUploadFileOutput,
  UpdateUploadFileInput,
  UpdateUploadFileOutput,
  GetUploadFileInput,
  GetUploadFileOutput,
  GetUploadFilesOutput,
} from './dtos/uploadFile.dto';
import { User } from 'src/hr/user/entities/user.entity';
import { UploadFile } from './entities/uploadFile.entitiy';
import { FilesService } from './files.service';

@Resolver(() => UploadFile)
export class FilesResolver {
  constructor(private readonly filesService: FilesService, @Inject(PUB_SUB) private readonly pubSub: PubSub) {}

  /**
   * @description 파일 조회
   * @param 업로드 파일 클래스
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  @Query(() => GetUploadFileOutput)
  @ActiveRole(['Any'])
  async getUploadFileById(
    @AuthUser() user: User,
    @Args('input') uploadFileInput: GetUploadFileInput,
  ): Promise<GetUploadFileOutput> {
    return this.filesService.getUploadFileById(user, uploadFileInput);
  }

  /**
   * @description 업로드 파일 리스트 조회
   * @param 업로드 파일 클래스
   * @returns 업로드 파일 리스트
   * @author ruping
   * @summary
   */
  @Query(() => GetUploadFilesOutput)
  @ActiveRole(['Any'])
  async getUploadFiles(
    @AuthUser() user: User,
    @Args('input') uploadFilesInput: GetUploadFileInput,
  ): Promise<GetUploadFilesOutput> {
    return this.filesService.getUploadFiles(user, uploadFilesInput);
  }

  /**
   * @description uploadFile 등록
   * @param 업로드 파일 클래스
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  @Mutation(() => CreateUploadFileOutput)
  @ActiveRole(['Any'])
  createUploadFile(
    @AuthUser() user: User,
    @Args('input') uploadFileInput: CreateUploadFileInput,
  ): Promise<CreateUploadFileOutput> {
    return this.filesService.createUploadFile(user, uploadFileInput);
  }

  /**
   * @description uploadFile 수정
   * @param 업로드 파일 클래스
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  @Mutation(() => UpdateUploadFileOutput)
  @ActiveRole(['Any'])
  updateUploadFile(
    @AuthUser() user: User,
    @Args('input') uploadFileInput: UpdateUploadFileInput,
  ): Promise<UpdateUploadFileOutput> {
    return this.filesService.updateUploadFile(user, uploadFileInput);
  }
}
