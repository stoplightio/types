import { LogLevel } from '../logs';
import { IPathPosition } from '../parsers';

export interface IValidation {
  ruleId: string;

  level?: number;

  /** Starting line of error */
  line?: number;
  column?: number;
  location?: IPathPosition;
}
