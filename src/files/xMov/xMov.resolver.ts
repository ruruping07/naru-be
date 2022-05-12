import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/common.constants';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { ActiveRole } from 'src/auth/activeRole.decorator';
import { User } from 'src/hr/user/entities/user.entity';
import {
  GetMovFileInput,
  GetMovFileOutput,
  GetMovFilesOutput,
  CreateMovFileInput,
  CreateMovFileOutput,
  UpdateMovFileOutput,
  UpdateMovFileInput,
} from './dtos/movFile.dto';
import { XMovService } from './xMov.service';
import { Inject } from '@nestjs/common';
import { MovFile } from './entities/movFile.entity';

@Resolver(() => MovFile)
export class XMovResolver {
  constructor(private readonly xMovService: XMovService, @Inject(PUB_SUB) private readonly pubSub: PubSub) {}
  /*----------------------------------------------------------------------------------------------------------------
  ** 영상파일 (movFile)
  ----------------------------------------------------------------------------------------------------------------*/

  /**
   * @description 영상파일 정보 조회
   * @param 사용자 클래스, 영상 정보 클래스
   * @returns 영상 정보 클래스
   * @author ruping
   * @summary
   */
  @Query(() => GetMovFileOutput)
  @ActiveRole(['Any'])
  async getMovFileById(
    @AuthUser() user: User,
    @Args('input') getMovFileInput: GetMovFileInput,
  ): Promise<GetMovFileOutput> {
    return this.xMovService.getMovFileById(user, getMovFileInput);
  }

  /**
   * @description 영상파일 정보 리스트 조회
   * @param 사용자 클래스, 영상 정보 클래스
   * @returns 영상 정보 클래스 리스트
   * @author ruping
   * @summary
   */
  @Query(() => GetMovFilesOutput)
  @ActiveRole(['Any'])
  async getMovFiles(
    @AuthUser() user: User,
    @Args('input') getMovFileInput: GetMovFileInput,
  ): Promise<GetMovFilesOutput> {
    return this.xMovService.getMovFiles(user, getMovFileInput);
  }

  /**
   * @description 영상파일 정보 등록
   * @param 영상 파일 클래스
   * @returns 영상 파일 클래스
   * @author ruping
   * @summary
   */
  @Mutation(() => CreateMovFileOutput)
  @ActiveRole(['Any'])
  createMovFile(@AuthUser() user: User, @Args('input') movFileInput: CreateMovFileInput): Promise<CreateMovFileOutput> {
    return this.xMovService.createMovFile(user, movFileInput);
  }

  /**
   * @description 영상파일 정보 수정
   * @param 영상 파일 클래스
   * @returns 영상 파일 클래스
   * @author ruping
   * @summary
   */
  @Mutation(() => UpdateMovFileOutput)
  @ActiveRole(['Any'])
  updateMovFile(@AuthUser() user: User, @Args('input') movFileInput: UpdateMovFileInput): Promise<UpdateMovFileOutput> {
    return this.xMovService.updateMovFile(user, movFileInput);
  }

  /*----------------------------------------------------------------------------------------------------------------
  ** 배우 (actor)
  ----------------------------------------------------------------------------------------------------------------*/



  /*----------------------------------------------------------------------------------------------------------------
  ** 배우, 영상 정보 매핑  (mapping actor / mov)
  ----------------------------------------------------------------------------------------------------------------*/
}
