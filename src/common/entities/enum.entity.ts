import { registerEnumType } from '@nestjs/graphql';

/** 동영상 화질 */
export enum MovieQualityEnum {
  SD = 'SD',
  HD = 'HD',
  FHD = 'FHD',
  UHD = 'UHD',
}

/** 사용자 접근 등급 */
export enum ActiveRollEnum {
  Guest = 'Guest',
  SystemAdministrator = 'SystemAdministrator',
  WorkerAdministrator = 'WorkerAdministrator',
  Worker = 'Worker',
  Any = 'Any',
}

registerEnumType(ActiveRollEnum, { name: 'ActiveRoll' });
registerEnumType(MovieQualityEnum, { name: 'MovieQuality' });