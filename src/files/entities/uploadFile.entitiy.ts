import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IsBoolean, IsEmail, IsString, Length, IsNumber, IsDate } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { CoreEntity } from 'src/common/entities/core.entity';
import { date } from 'joi';

@InputType('UploadFileInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class UploadFile extends CoreEntity {
  @Column({ nullable: true, comment: '파일명' })
  @Field(() => String, { nullable: true })
  @IsString()
  @Length(1)
  fileName: string;

  @Column({ nullable: true, comment: '파일 확장자' })
  @Field(() => String, { nullable: true })
  @IsString()
  @Length(2)
  fileExt: string;

  @Column({ default: 0, comment: '파일크기' })
  @Field(() => Number)
  @IsNumber()
  fileSize: number;

  @Column({ comment: '등록 사용자ID' })
  @Field(() => Number)
  registerUserId: number;

  @Column({ nullable: true, comment: '등록 일시' })
  @Field(() => Date)
  @IsDate()
  registerDate: Date;
}