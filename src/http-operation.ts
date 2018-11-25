import { Dictionary } from './basic';
import { INode, INodeExample } from './graph';
import { ISchema } from './schemas';
import { IServer } from './servers';

export interface IHttpOperation extends INode {
  method: string;
  path: string;
  responses: IHttpOpResponse[];
  servers?: IServer[];
  request?: IHttpOpRequestParams;
  security?: HttpOpSecurityScheme[];
  deprecated?: boolean;
}

// Inspired by: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject
export interface IHttpOpParam {
  name: string;
  style?: HttpOpParamStyles;
  description?: string;
  required?: boolean;
  explode?: boolean;
  deprecated?: boolean;

  // most of the type, params from oas2/oas3 will simply be converted to a single content object with mediaType = '*'
  contents: IHttpOpContent[];
}

export enum HttpOpParamStyles {
  Simple = 'simple',
  Matrix = 'matrix',
  Label = 'label',
  Form = 'form',
  SpaceDelimited = 'spaceDelimited',
  PipeDelimited = 'pipeDelimited',
  DeepObject = 'deepObject',
}

export interface IHttpOpPathParam extends IHttpOpParam {
  // defaults to simple
  style?: HttpOpParamStyles.Label | HttpOpParamStyles.Matrix | HttpOpParamStyles.Simple;
}

export interface IHttpOpQueryParam extends IHttpOpParam {
  // defaults to form
  style?:
    | HttpOpParamStyles.Form
    | HttpOpParamStyles.SpaceDelimited
    | HttpOpParamStyles.PipeDelimited
    | HttpOpParamStyles.DeepObject;

  allowEmptyValue?: boolean;
  allowReserved?: boolean;
}

export interface IHttpOpHeaderParam extends IHttpOpParam {
  // defaults to simple
  style?: HttpOpParamStyles.Simple;
}

export interface IHttpOpCookieParam extends IHttpOpParam {
  // defaults to form
  style?: HttpOpParamStyles.Form;
}

export interface IHttpOpEncoding {
  property: string;
  mediaType?: string;
  headers?: IHttpOpHeaderParam[];

  // deafults to form
  style:
    | HttpOpParamStyles.Form
    | HttpOpParamStyles.SpaceDelimited
    | HttpOpParamStyles.PipeDelimited
    | HttpOpParamStyles.DeepObject;

  explode?: boolean;
  allowReserved?: boolean;
}

export interface IHttpOpContent {
  mediaType: string;
  schema?: ISchema;
  examples?: INodeExample[];
  encodings?: IHttpOpEncoding[];
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#link-object
export interface IHttpOpLink {
  operationRef: string;
  parameters: Array<{
    name: string;
    value?: any;
    expression?: string;
  }>;
  requestBody?: any;
  description?: string;
  server?: IServer;
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#requestBodyObject
export interface IHttpOpRequestBody {
  description?: string;
  required?: boolean;
  contents: IHttpOpContent[];
}

export interface IHttpOpRequestParams {
  path?: IHttpOpPathParam[];
  query?: IHttpOpQueryParam[];
  headers?: IHttpOpHeaderParam[];
  cookie?: IHttpOpCookieParam[];
  body?: IHttpOpRequestBody;
}

export interface IHttpOpResponse {
  // Note: code MAY contain uppercase "X" to indicate wildcard
  // Examples: 200, 2XX, 4XX, XXX ("default" in OAS)
  // When mocking, should select most specific defined code
  code: string;
  contents: IHttpOpContent[];
  description?: string;
  headers?: IHttpOpHeaderParam[];
  links?: IHttpOpLink;
}

/**
 * Security
 */

export type HttpOpSecurityScheme =
  | IApiKeySecurityScheme
  | IBearerSecurityScheme
  | IBasicSecurityScheme
  | IOauth2SecurityScheme
  | IOpenIdConnectSecurityScheme;

export interface ISecurityScheme {
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
  refreshUrl?: string;
  scopes: Array<Dictionary<string, string>>;
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
