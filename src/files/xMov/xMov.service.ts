import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import {
  GetMovFileInput,
  GetMovFileOutput,
  GetMovFilesOutput,
  CreateMovFileInput,
  CreateMovFileOutput,
  UpdateMovFileInput,
  UpdateMovFileOutput,
} from './dtos/movFile.dto';
import { User } from 'src/hr/user/entities/user.entity';
import { MovFile } from './entities/movFile.entity';
import {
  CreateActorInput,
  CreateActorOutput,
  GetActorInput,
  GetActorOutput,
  GetActorsOutput,
  UpdateActorInput,
  UpdateActorOutput,
} from './dtos/actor.dto';
import { Actor } from './entities/actor.entitiy';
import { CreateMappMovActorInput, CreateMappMovActorOutput, GetMappMovActorInput, GetMappMovActorOutput, GetMappMovActorsOutput } from './dtos/mappMovActor.dto';
import { MappMovActor } from './entities/mappMovActor.entity';


@Injectable()
export class XMovService {
  constructor(
    @InjectRepository(User) private readonly userIR: Repository<User>,
    @InjectRepository(MovFile) private readonly movFileIR: Repository<MovFile>,
    @InjectRepository(Actor) private readonly actorIR: Repository<Actor>,
    @InjectRepository(MappMovActor) private readonly mappMovActorIR: Repository<MappMovActor>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  /*----------------------------------------------------------------------------------------------------------------
  ** 영상파일 (movFile)
  ----------------------------------------------------------------------------------------------------------------*/

  /**
   * @description 영상 파일 조회
   * @param GetMovFileInput(movFileKeyId)
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */

  async getMovFileById(
    { keyId: userKeyId }: User,
    { keyId: movFileKeyId }: GetMovFileInput,
  ): Promise<GetMovFileOutput> {
    try {
      let movFile;

      if (movFileKeyId == 0) {
        this.logger.error(`파라미터 없음, getMovFileById()`);
        return { status: false, message: `파라미터 에러`, flag: 'E' };
      }

      if (movFileKeyId) {
        movFile = await this.movFileIR.findOne(movFileKeyId, {
          relations: ['uploadFile', 'mappMovActor'],
        });
      }

      if (!movFile) {
        this.logger.error(`데이터를 찾을 수 없음, getMovFileById()`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', movFile };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getMovFileById()`, flag: 'E' };
    }
  }

  /**
   * @description 영상 파일 리스트 조회
   * @param 사용자 클래스(keyId)
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  async getMovFiles({ keyId: userKeyId }: User, { fullNo }: GetMovFileInput): Promise<GetMovFilesOutput> {
    try {
      const movFiles = await this.movFileIR.find({
        where: {
          ...(fullNo && { fullNo }),
        },
        //relations: ['uploadFile'],
      });

      if (!movFiles) {
        this.logger.error(`데이터를 찾을 수 없음`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', movFiles };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getMovFiles()`, flag: 'E' };
    }
  }

  /**
   * @description 영상 정보 생성
   * @param 사용자 클래스(keyId)
   * @param 영상 정보 클래스
   * @returns 영상 정보 클래스
   * @author ruping
   * @summary
   */
  async createMovFile(
    { keyId: userKeyId }: User,
    createMovFileInput: CreateMovFileInput,
  ): Promise<CreateMovFileOutput> {
    try {
      const movFile = await this.movFileIR.save(this.movFileIR.create(createMovFileInput));

      return { status: true, message: 'succeed', flag: 'S', movFile };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }

  /**
   * @description 영상 정보 수정
   * @param 사용자 클래스(keyId)
   * @param 영상 정보 클래스
   * @returns 영상 정보 클래스
   * @author ruping
   * @summary
   */
  async updateMovFile(
    { keyId: userKeyId }: User,
    updateMovFileInput: UpdateMovFileInput,
  ): Promise<UpdateMovFileOutput> {
    try {
      //대상 조회
      const uploadFileInfo = await this.movFileIR.findOne(updateMovFileInput.keyId);

      uploadFileInfo.movQuality = updateMovFileInput.movQuality;
      uploadFileInfo.remarks = updateMovFileInput.remarks;

      const movFile = await this.movFileIR.save(this.movFileIR.create(updateMovFileInput));

      return { status: true, message: 'succeed', flag: 'S', movFile };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }

  /*----------------------------------------------------------------------------------------------------------------
  ** 배우 (actor)
  ----------------------------------------------------------------------------------------------------------------*/
  /**
   * @description 배우 정보 조회
   * @param GetActorInput
   * @returns 배우 클래스
   * @author ruping
   * @summary
   */

  async getActorById({ keyId: userKeyId }: User, { keyId: actorKeyId }: GetActorInput): Promise<GetActorOutput> {
    try {
      let actor;

      if (actorKeyId == 0) {
        this.logger.error(`파라미터 없음, getActorById()`);
        return { status: false, message: `파라미터 에러`, flag: 'E' };
      }

      if (actorKeyId) {
        actor = await this.mappMovActorIR.findOne(actorKeyId, {
          //relations: ['uploadFile', 'mappMovActor'],
        });
      }

      if (!actor) {
        this.logger.error(`데이터를 찾을 수 없음, getActorById()`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', actor };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getActorById()`, flag: 'E' };
    }
  }

  /**
   * @description 영상 파일 리스트 조회
   * @param 배우 클래스
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  async getActors({ keyId: userKeyId }: User, { actorName }: GetActorInput): Promise<GetActorsOutput> {
    try {
      const actors = await this.actorIR.find({
        where: {
          ...(actorName && { actorName }),
        },
        //relations: ['uploadFile'],
      });

      if (!actors) {
        this.logger.error(`데이터를 찾을 수 없음`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', actors };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getActors()`, flag: 'E' };
    }
  }

  /**
   * @description 배우 정보 생성
   * @param 사용자 클래스(keyId)
   * @param 배우 정보 클래스
   * @returns 배우 정보 클래스
   * @author ruping
   * @summary
   */
  async createActor({ keyId: userKeyId }: User, createActorInput: CreateActorInput): Promise<CreateActorOutput> {
    try {
      const actor = await this.actorIR.save(this.actorIR.create(createActorInput));

      return { status: true, message: 'succeed', flag: 'S', actor };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }

  /**
   * @description 배우 정보 수정
   * @param 사용자 클래스(keyId)
   * @param 배우 정보 클래스
   * @returns 배우 정보 클래스
   * @author ruping
   * @summary
   */
  async updateActor({ keyId: userKeyId }: User, updateActorInput: UpdateActorInput): Promise<UpdateActorOutput> {
    try {
      //대상 조회
      const actorInfo = await this.actorIR.findOne(updateActorInput.keyId);

      //'actorName', 'actorNameJp', 'actorNameKr', 'isActive', 'yearOfBirth', 'remarks'

      actorInfo.actorName = updateActorInput.actorName;
      actorInfo.actorNameJp = updateActorInput.actorNameJp;
      actorInfo.actorNameKr = updateActorInput.actorNameKr;
      actorInfo.isActive = updateActorInput.isActive;
      actorInfo.yearOfBirth = updateActorInput.yearOfBirth;
      actorInfo.remarks = updateActorInput.remarks;

      const actor = await this.actorIR.save(this.actorIR.create(actorInfo));

      return { status: true, message: 'succeed', flag: 'S', actor };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }

  /*----------------------------------------------------------------------------------------------------------------
  ** 배우, 영상 정보 매핑  (mapping actor / mov)
  ----------------------------------------------------------------------------------------------------------------*/
  /**
   * @description 배우 정보 조회
   * @param 사용자 클래스, 배우/영상 매핑 (keyId)
   * @returns 배우 클래스
   * @author ruping
   * @summary
   */

  async getMappMovActorById(
    { keyId: userKeyId }: User,
    { keyId: mappMovActorKeyId }: GetMappMovActorInput,
  ): Promise<GetMappMovActorOutput> {
    try {
      let movActor;

      if (mappMovActorKeyId == 0) {
        this.logger.error(`파라미터 없음, getMappMovActorById()`);
        return { status: false, message: `파라미터 에러`, flag: 'E' };
      }

      movActor = await this.mappMovActorIR.findOne(mappMovActorKeyId, {
        //relations: ['uploadFile', 'mappMovActor'],
      });

      if (!movActor) {
        this.logger.error(`데이터를 찾을 수 없음, getMappMovActorById()`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', movActor };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getMappMovActorById()`, flag: 'E' };
    }
  }

  /**
   * @description 배우/영상 매핑 리스트 조회
   * @param 사용자 클래스, 배우/영상 매핑 클래스
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  async getMappMovActors(
    { keyId: userKeyId }: User,
    { keyId: mappMovActorKeyId }: GetMappMovActorInput,
  ): Promise<GetMappMovActorsOutput> {
    try {
      const movActors = await this.mappMovActorIR.find({
        /*
        where: {
          ...(actorName && { actorName }),
        },
        relations: ['uploadFile'],
        */
      });

      if (!movActors) {
        this.logger.error(`데이터를 찾을 수 없음`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', movActors };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getMappMovActors()`, flag: 'E' };
    }
  }

  /**
   * @description 배우/영상 매핑 정보 생성
   * @param 사용자 클래스(keyId)
   * @param 배우/영상 매핑 정보 클래스
   * @returns 배우/영상 매핑 정보 클래스
   * @author ruping
   * @summary
   */
  async createMappMovActor(
    { keyId: userKeyId }: User,
    createMappMovActorInput: CreateMappMovActorInput,
  ): Promise<CreateMappMovActorOutput> {
    try {
      const movActor = await this.mappMovActorIR.save(this.mappMovActorIR.create(createMappMovActorInput));

      return { status: true, message: 'succeed', flag: 'S', movActor };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }
}
