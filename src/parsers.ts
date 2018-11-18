import { IValidation } from './validations';

export type SourceMapParser<T = any> = (value: string) => IParserResult<T>;

export type ObjPath = Array<string | number>;

export interface IPosition {
  /** line number (should start at 1) */
  line: number;
  column?: number;
}

export interface IPathPosition {
  start: IPosition;
  end?: IPosition;
}

export interface IParserResultPointers {
  [jsonPath: string]: IPathPosition;
}

export interface IParserResult<T = any> {
  data: T;
  pointers: IParserResultPointers;
  validations: IValidation[];
}
