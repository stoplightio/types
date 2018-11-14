import { IPathPosition } from '../parsers';

export interface IValidation {
  ruleId: string;

  /** Starting line of error */
  line?: number;

  column?: number;
  location?: IPathPosition;
}
