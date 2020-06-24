/**
 * Stoplight node types
 */
export enum NodeType {
  Article = 'article',
  HttpService = 'http_service',
  HttpServer = 'http_server',
  HttpOperation = 'http_operation',
  Model = 'model',
  Generic = 'generic',
  Unknown = 'unknown',
}

/**
 * Node data formats
 */
export enum NodeFormat {
  Json = 'json',
  Markdown = 'markdown',
  Yaml = 'yaml',
}
