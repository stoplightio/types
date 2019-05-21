import { Dictionary } from './basic';
import { INode, INodeExample, INodeExternalExample } from './graph';
import { ISchema } from './schemas';
import { IServer } from './servers';

/**
 * HTTP Service
 */

export interface IHttpService extends INode {
  name: string;
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name: string;
    url?: string;
  };
  version: string;
  servers: IServer[];
  security: HttpSecurityScheme[];
  securitySchemes: HttpSecurityScheme[];
}

/**
 * HTTP Operation
 */

export interface IHttpOperation extends INode {
  method: string;
  path: string;
  request: IHttpOperationRequest;
  responses: IHttpOperationResponse[];
  servers: IServer[];
  security: HttpSecurityScheme[];
  deprecated?: boolean;
}

export interface IHttpOperationRequest {
  path: IHttpPathParam[];
  query: IHttpQueryParam[];
  headers: IHttpHeaderParam[];
  cookie: IHttpCookieParam[];
  body?: IHttpOperationRequestBody;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#requestBodyObject
export interface IHttpOperationRequestBody {
  contents: IHttpContent[];
  required?: boolean;
  description?: string;
}

export interface IHttpOperationResponse {
  // Note: code MAY contain uppercase "X" to indicate wildcard
  // Examples: 200, 2XX, 4XX, XXX ("default" in OAS)
  // When mocking, should select most specific defined code
  code: string;
  contents: IHttpContent[];
  headers: IHttpHeaderParam[];
  description?: string;
}

/**
 * HTTP Params
 */

// Inspired by: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject
export interface IHttpParam {
  name: string;
  style: HttpParamStyles;
  description?: string;
  required?: boolean;
  explode?: boolean;
  deprecated?: boolean;

  // most of the type, params from oas2/oas3 will simply be converted to a single content object with mediaType = '*'
  contents: IHttpContent[];
}

export enum HttpParamStyles {
  Simple = 'simple',
  Matrix = 'matrix',
  Label = 'label',
  Form = 'form',
  SpaceDelimited = 'spaceDelimited',
  PipeDelimited = 'pipeDelimited',
  DeepObject = 'deepObject',
}

export interface IHttpPathParam extends IHttpParam {
  // should default to simple
  style: HttpParamStyles.Label | HttpParamStyles.Matrix | HttpParamStyles.Simple;
}

export interface IHttpQueryParam extends IHttpParam {
  // should default to form
  style:
    | HttpParamStyles.Form
    | HttpParamStyles.SpaceDelimited
    | HttpParamStyles.PipeDelimited
    | HttpParamStyles.DeepObject;

  allowEmptyValue?: boolean;
  allowReserved?: boolean;
}

export interface IHttpHeaderParam extends IHttpParam {
  // should default to simple
  style: HttpParamStyles.Simple;
}

export interface IHttpCookieParam extends IHttpParam {
  // should default to form
  style: HttpParamStyles.Form;
}

/**
 * HTTP Content
 */

export interface IHttpContent {
  mediaType: string;
  schema?: ISchema;
  examples: Array<INodeExample | INodeExternalExample>;
  encodings: IHttpEncoding[];
}

export interface IHttpEncoding {
  property: string;
  headers: IHttpHeaderParam[];
  mediaType?: string;

  // deafults to form
  style:
    | HttpParamStyles.Form
    | HttpParamStyles.SpaceDelimited
    | HttpParamStyles.PipeDelimited
    | HttpParamStyles.DeepObject;

  explode?: boolean;
  allowReserved?: boolean;
}

/**
 * HTTP Security
 */

export type HttpSecurityScheme =
  | IApiKeySecurityScheme
  | IBearerSecurityScheme
  | IBasicSecurityScheme
  | IOauth2SecurityScheme
  | IOpenIdConnectSecurityScheme;

interface ISecurityScheme {
  description?: string;
}

export interface IApiKeySecurityScheme extends ISecurityScheme {
  type: 'apiKey';
  name: string;
  in: 'query' | 'header' | 'cookie';
}

export interface IBearerSecurityScheme extends ISecurityScheme {
  type: 'http';
  scheme: 'bearer';
  bearerFormat?: string;
}

export interface IBasicSecurityScheme extends ISecurityScheme {
  type: 'http';
  scheme: 'basic';
}

export interface IOpenIdConnectSecurityScheme extends ISecurityScheme {
  type: 'openIdConnect';
  openIdConnectUrl: string;
}

export interface IOauth2SecurityScheme extends ISecurityScheme {
  type: 'oauth2';
  flows: IOauthFlowObjects;
}

export interface IOauthFlowObjects {
  implicit?: IOauth2ImplicitFlow;
  password?: IOauth2PasswordFlow;
  clientCredentials?: IOauth2ClientCredentialsFlow;
  authorizationCode?: IOauth2AuthorizationCodeFlow;
}

export interface IOauth2Flow {
  scopes: Array<Dictionary<string, string>>;
  refreshUrl?: string;
}

export interface IOauth2ImplicitFlow extends IOauth2Flow {
  authorizationUrl: string;
}

export interface IOauth2AuthorizationCodeFlow extends IOauth2Flow {
  authorizationUrl: string;
  tokenUrl: string;
}

export interface IOauth2PasswordFlow extends IOauth2Flow {
  tokenUrl: string;
}

export interface IOauth2ClientCredentialsFlow extends IOauth2Flow {
  tokenUrl: string;
}
