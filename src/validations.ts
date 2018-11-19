import { IPathPosition, ObjPath } from './parsers';

export enum ValidationSeverity {
  Info = 30,
  Warn = 40,
  Error = 50,
}

export enum ValidationSeverityLabel {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export interface IValidation {
  /** Name identifier for this type of validation. */
  name: string;

  /** Validation severity as a number. */
  severity: ValidationSeverity;

  /** Optional validation severity as a pretty string. */
  severityLabel: ValidationSeverityLabel;

  /** Optional information about this error. */
  message?: string;

  /** Optional additional description for {name} validation type. */
  description?: string;

  /** Optional path in the serialized object that this validation is related to. */
  path?: ObjPath;

  /** Optional location in the deserialized string that this validation is related to. */
  location?: IPathPosition;

  /** Additional properties that a specific validator might add. */
  [key: string]: any;
}
