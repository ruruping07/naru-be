import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const GetUuid = () => {
  return uuid();
};

export const GetFileUuid = (fileExt:String) => {
  return `${uuid()}${"."}${fileExt}`;
};
