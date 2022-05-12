import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateUserInput, CreateUserOutput, GetUserInput, GetUserOutput } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  /*
   * Key로 사용자 찾기
   */
  async findById(keyId: number): Promise<GetUserOutput> {
    try {
      const user = await this.user.findOneOrFail({ keyId });

      if (user) {
        return { status: true, message: '', flag: '', user };
      }
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: 'Error: findById', flag: '' };
    }

    return { status: false, message: '찾을 수 없는 사용자', flag: '' };
  }

  /*
   * 로그인
   */
  async login({ userId, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.user.findOne({ userId }, { select: ['keyId', 'password'] });

      if (!user) {
        return { status: false, message: '사용자 ID와 비밀번호가 일치하지 않음', flag: '' };
      }

      const isPassword = await user.checkPassword(password);

      if (!isPassword) {
        return { status: false, message: '사용자 ID와 비밀번호가 일치하지 않음', flag: '' };
      }

      const token = this.jwtService.sign(user.keyId);

      return { status: true, token, flag: '' };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: 'Error: 알수 없는 오류', flag: '' };
    }
  }

  /*
   * 사용자 생성
   */
  async createAccount({ userId, userName, email }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const exists = await this.user.findOne({ userId });

      if (exists) {
        this.logger.error('func => createAccount : 등록된 사용자');
        return { status: false, message: '등록된 사용자', flag: '' };
      }

      const user = await this.user.save(
        this.user.create({
          userId,
          userName,
          email,
          password: userId,
          isUse: true,
          changePasswordYn: true,
        }),
      );

      return { status: true, message: '', flag: '' };
    } catch (error) {
      this.logger.error(error);
      return { status: false, message: 'Error: 사용자 등록 오류', flag: '' };
    }
  }
}
