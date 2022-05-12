import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true, comment: '사용자ID' })
  @Field(() => String)
  @IsString()
  userId: string;

  @Column({ comment: '사용자명' })
  @Field(() => String)
  @IsString()
  userName: string;

  @Column({ unique: true, comment: 'Email' })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column({ comment: '사용자 비밀번호' })
  @Field(() => String)
  @IsString()
  @Length(4)
  @Column({ select: false })
  password: string;

  @Column({ default: false, comment: '사용여부' })
  @Field(() => Boolean)
  @IsBoolean()
  isUse: boolean;

  @Column({ default: false, comment: '비밀번호 대상 여부' })
  @Field(() => Boolean)
  @IsBoolean()
  changePasswordYn: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
