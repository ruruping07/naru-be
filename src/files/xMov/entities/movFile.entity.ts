import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MappMovActor } from './mappMovActor.entity';
import { MovieQualityEnum } from 'src/common/entities/enum.entity';
import { UploadFile } from 'src/files/entities/uploadFile.entitiy';

@InputType('MovFileInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MovFile extends CoreEntity {
  /* ex) XXX-001 */
  @Column({ comment: '전체품번' })
  @Field(() => String)
  @IsString()
  fullNo: string;

  /* ex) XXX */
  @Column({ nullable: true, comment: '품번명' })
  @Field(() => String, { nullable: true })
  @IsString()
  frontNo: string;

  /* ex) 001 */
  @Column({ nullable: true, comment: '품번번호' })
  @Field(() => String, { nullable: true })
  @IsString()
  endNo: string;

  @Column({ type: 'enum', enum: MovieQualityEnum, comment: '영상화질' })
  @Field(() => MovieQualityEnum)
  @IsEnum(MovieQualityEnum)
  movQuality: MovieQualityEnum;

  @Column({ nullable: true, comment: '비고' })
  @Field(() => String, { nullable: true })
  @IsString()
  remarks: string;

  @Field(() => UploadFile)
  @OneToOne(() => UploadFile, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  uploadFile: UploadFile;

  @Field(() => MappMovActor)
  @OneToMany(() => MappMovActor, (mappMovActor) => mappMovActor.movFile)
  mappMovActor: MappMovActor[];
}
