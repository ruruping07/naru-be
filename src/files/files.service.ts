import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { UploadFile } from './entities/uploadFile.entitiy';
import { User } from 'src/hr/user/entities/user.entity';
import {
  CreateUploadFileInput,
  CreateUploadFileOutput,
  UpdateUploadFileInput,
  UpdateUploadFileOutput,
  GetUploadFileInput,
  GetUploadFileOutput,
  GetUploadFilesOutput,
} from './dtos/uploadFile.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(User) private readonly userIR: Repository<User>,
    @InjectRepository(UploadFile) private readonly uploadFilesIR: Repository<UploadFile>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  /**
   * @description 업로드 파일 조회
   * @param 사용자 클래스(keyId)
   * @param 업로드 파일 클래스(keyId)
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  async getUploadFileById(
    { keyId: userKeyId }: User,
    { keyId: uploadFileKeyId }: GetUploadFileInput,
  ): Promise<GetUploadFileOutput> {
    try {
      const uploadFile = await this.uploadFilesIR.findOne(uploadFileKeyId);

      if (!uploadFile) {
        this.logger.error(`데이터를 찾을 수 없음, FileKeyId : ${uploadFileKeyId}`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', uploadFile };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getUploadFile()`, flag: 'E' };
    }
  }

  /**
   * @description 업로드 파일 리스트 조회
   * @param 사용자 클래스(keyId)
   * @param 업로드 파일 클래스(fileName)
   * @returns 업로드 파일 클래스
   * @author ruping
   * @summary
   */
  async getUploadFiles({ keyId: userKeyId }: User, { fileName }: GetUploadFileInput): Promise<GetUploadFilesOutput> {
    try {
      const uploadFiles = await this.uploadFilesIR.find({
        where: {
          ...(fileName && { fileName }),
        },
        //relations: ['mappMovUploadFile'],
      });

      if (!uploadFiles) {
        this.logger.error(`데이터를 찾을 수 없음`);
        return { status: false, message: `Data not found`, flag: 'E' };
      }

      return { status: true, message: 'succeed', flag: 'S', uploadFiles };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: `Error: getUploadFiles()`, flag: 'E' };
    }
  }

  /**
   * @description 업로드 파일 데이터 생성
   * @param 사용자 클래스
   * @param 업로드파일 클래스
   * @returns 업로드파일 클래스
   * @author ruping
   * @summary
   */
  async createUploadFile(
    { keyId: userKeyId }: User,
    { fileName, fileExt, fileSize }: CreateUploadFileInput,
  ): Promise<CreateUploadFileOutput> {
    try {
      //uploadFile 중복 확인은 각 업로드에서 체크(영상은 영상업로드 로직에서..)

      //파일 정보 DB 등록
      const registerUserId = userKeyId;
      const registerDate = new Date();
      const createdUploadFile = await this.uploadFilesIR.save(
        this.uploadFilesIR.create({ fileName, fileExt, fileSize, registerUserId, registerDate }),
      );

      return { status: true, message: 'succeed', flag: 'S', createdUploadFile };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }

  /**
   * @description 업로드 파일 데이터 수정
   * @param 사용자 클래스
   * @param 업로드파일 클래스
   * @returns 업로드파일 클래스
   * @author ruping
   * @summary
   */
  async updateUploadFile(
    { keyId: userKeyId }: User,
    updateFileInput: UpdateUploadFileInput,
  ): Promise<UpdateUploadFileOutput> {
    try {
      //대상 조회
      const uploadFileInfo = await this.uploadFilesIR.findOne(updateFileInput.keyId);

      //파일 정보 DB 업데이트
      uploadFileInfo.registerUserId = userKeyId;
      uploadFileInfo.registerDate = new Date();
      uploadFileInfo.fileSize = updateFileInput.fileSize;

      const updatedUploadFile = await this.uploadFilesIR.save(uploadFileInfo);

      return { status: true, message: 'succeed', flag: 'S', updatedUploadFile };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: error.toString(), flag: 'E' };
    }
  }
}
