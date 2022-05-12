import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { MovFile } from './movFile.entity';
import { Actor } from './actor.entitiy';

@InputType('MappMovActorInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class MappMovActor extends CoreEntity {
  @Field(() => Actor)
  @ManyToOne(() => Actor, (actor) => actor.mappMovActor, { onDelete: 'SET NULL', eager: true })
  actor!: Actor;

  @Field(() => MovFile)
  @ManyToOne(() => MovFile, (movFile) => movFile.mappMovActor, { onDelete: 'SET NULL', eager: true })
  movFile!: MovFile;
}
