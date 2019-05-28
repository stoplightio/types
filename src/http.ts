import { Dictionary } from './basic';
import { IHttpOperation } from './http-spec';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
export type ExtendedHttpMethod = HttpMethod | 'trace' | 'copy' | 'link' | 'unlink' | 'purge' | 'lock' | 'unlock';

export interface IHttpLog<T = any> {
  request: IHttpRequest<T>;
  response?: IHttpResponse<T>;
  operation?: IHttpOperation;
}

/** Inspired by the Axios typings, since that is what Stoplight generally uses under the hood. */
export interface IHttpRequest<T = any> {
  method: HttpMethod;

  /** Can be relative or absolute. If relative, `baseUrl` must also be set. */
  url: string;

  /** `baseUrl` will be prepended to `url` unless `url` is absolute. */
  baseUrl: string;

  headers: HttpNameValue;
  query: HttpNameValues;
  body?: T;
}

export interface IHttpResponse<T = any> {
  status: number;
  headers: HttpNameValue;
  body?: T;
}

export type HttpNameValue = Dictionary<string, string>;
export type HttpNameValues = Dictionary<string[], string>;
