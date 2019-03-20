import { IDiagnostic } from './diagnostics';

export type SourceMapParser<T = any> = (value: string) => IParserResult<T>;

export type DocumentUri = string;
export type Segment = string | number;
export type JSONPath = Segment[];

export interface IParserResult<T = any, A extends object = object> extends IParserASTResult<T, A> {
  diagnostics: IDiagnostic[];
}

export interface IParserASTResult<T = any, A extends object = object> {
  data: T;
  ast: A;
  lineMap: number[];
}

export type GetJsonPathForPosition<A extends object> = (
  result: IParserASTResult<unknown, A>,
  position: IPosition
) => JSONPath | undefined;

// ILocation comes from the language server specification
export type GetLocationForJsonPath<A extends object> = (
  result: IParserASTResult<unknown, A>,
  path: JSONPath
) => ILocation | undefined;

export interface IPosition {
  /**
   * Line position in a document (zero-based).
   */
  readonly line: number;

  /**
   * Character offset on a line in a document (zero-based). Assuming that the line is
   * represented as a string, the `character` value represents the gap between the
   * `character` and `character + 1`.
   *
   * If the character value is greater than the line length it defaults back to the
   * line length.
   */
  readonly character: number;
}

/**
 * A range represents an ordered pair of two positions.
 * It is guaranteed that start isBeforeOrEqual end.
 */
export interface IRange {
  /**
   * The start position. It is before or equal to end.
   */
  readonly start: IPosition;

  /**
   * The end position. It is after or equal to start.
   */
  readonly end: IPosition;
}

export interface ILocation {
  uri?: DocumentUri;
  range: IRange;
}

export interface IJsonLocation extends ILocation {
  path: JSONPath;
}
