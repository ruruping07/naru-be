import { SetMetadata } from '@nestjs/common';
import { ActiveRollEnum } from 'src/common/entities/enum.entity';

export type ActiveRolls = keyof typeof ActiveRollEnum | 'Any';

export const ActiveRole = (activeRoles: ActiveRolls[]) => SetMetadata('activeRoles', activeRoles);