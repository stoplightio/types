import { LogLevel } from '../logs';
import { IPathPosition } from '../parsers';

export interface IValidation {
  ruleId: string;

  level?: LogLevel;

  /** Starting line of error */
  line?: number;
  column?: number;
  location?: IPathPosition;
}
