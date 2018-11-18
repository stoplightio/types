import { INode, INodeExample } from './graph';
import { ISchema } from './schemas';
import { IServer } from './servers';

export interface IHttpOperation extends INode {
  method: string;
  path: string;
  responses: IHttpResponse[];
  servers?: IServer[];
  request?: IHttpRequestParams;
  security?: HttpSecurityScheme[];
  deprecated?: boolean;
}

// Inspired by: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject
export interface IHttpParam {
  name: string;
  style?: HttpParamStyles;
  description?: string;
  required?: boolean;
  explode?: boolean;
  deprecated?: boolean;

  // most of the type, params from oas2/oas3 will simply be converted to content with one '*' key
  content: {
    [mediaType: string]: IHttpContent;
  };
}

export const enum HttpParamStyles {
  Simple = 'simple',
  Matrix = 'matrix',
  Label = 'label',
  Form = 'form',
  SpaceDelimited = 'spaceDelimited',
  PipeDelimited = 'pipeDelimited',
  DeepObject = 'deepObject',
}

export interface IHttpPathParam extends IHttpParam {
  // defaults to simple
  style?: HttpParamStyles.Label | HttpParamStyles.Matrix | HttpParamStyles.Simple;
}

export interface IHttpQueryParam extends IHttpParam {
  // defaults to form
  style?:
    | HttpParamStyles.Form
    | HttpParamStyles.SpaceDelimited
    | HttpParamStyles.PipeDelimited
    | HttpParamStyles.DeepObject;

  allowEmptyValue?: boolean;
  allowReserved?: boolean;
}

export interface IHttpHeaderParam extends IHttpParam {
  // defaults to simple
  style?: HttpParamStyles.Simple;
}

export interface IHttpCookieParam extends IHttpParam {
  // defaults to form
  style?: HttpParamStyles.Form;
}

export interface IHttpEncoding {
  property: string;
  mediaType?: string;
  headers?: IHttpHeaderParam[];
  // deafults to form
  style:
    | HttpParamStyles.Form
    | HttpParamStyles.SpaceDelimited
    | HttpParamStyles.PipeDelimited
    | HttpParamStyles.DeepObject;

  explode?: boolean;
  allowReserved?: boolean;
}

export interface IHttpContent {
  mediaType: string;
  schema?: ISchema;
  examples?: INodeExample[];
  encodings?: IHttpEncoding[];
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#link-object
export interface IHttpLink {
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
export interface IHttpRequestBody {
  description?: string;
  required?: boolean;
  contents: IHttpContent[];
}

export interface IHttpRequestParams {
  path?: IHttpPathParam[];
  query?: IHttpQueryParam[];
  headers?: IHttpHeaderParam[];
  cookie?: IHttpCookieParam[];
  body?: IHttpRequestBody;
}

export interface IHttpResponse {
  // Note: code MAY contain uppercase "X" to indicate wildcard
  // Examples: 200, 2XX, 4XX, XXX ("default" in OAS)
  // When mocking, should select most specific defined code
  code: string;
  contents: IHttpContent[];
  description?: string;
  headers?: IHttpHeaderParam[];
  links?: IHttpLink;
}

/**
 * Security
 */

type HttpSecurityScheme =
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
  scopes: Array<{
    [name: string]: string;
  }>;
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
