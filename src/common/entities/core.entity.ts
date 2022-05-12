import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn({ comment: 'Row Key' })
  @Field(() => Number)
  keyId: number;

  @CreateDateColumn({ comment: '생성일시' })
  @Field(() => Date)
  createdDate: Date;

  @UpdateDateColumn({ nullable: true, comment: '수정일시' })
  @Field(() => Date, { nullable: true })
  modifiedDate: Date;
}
