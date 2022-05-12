import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MappMovActor} from './mappMovActor.entity';

@InputType('ActorInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Actor extends CoreEntity {
  @Column({ comment: '배우명 영문' })
  @Field(() => String)
  @IsString()
  actorName: string;

  @Column({ nullable: true, comment: '배우명 한자/일문' })
  @Field(() => String, { nullable: true })
  @IsString()
  actorNameJp: string;

  @Column({ nullable: true, comment: '배우명 한글' })
  @Field(() => String, { nullable: true })
  @IsString()
  actorNameKr: string;

  @Column({ default: true, comment: '활동 여부' })
  @Field(() => Boolean)
  @IsString()
  isActive: boolean;

  @Column({ default: 'N/A', comment: '생년' })
  @Field(() => String)
  @IsString()
  yearOfBirth: string;

  @Column({ nullable: true, comment: '비고' })
  @Field(() => String, { nullable: true })
  @IsString()
  remarks: string;

  @Field(() => MappMovActor)
  @OneToMany(() => MappMovActor, (mappMovActor) => mappMovActor.actor)
  mappMovActor: MappMovActor[];
}
