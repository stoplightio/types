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
  TableOfContents = 'table_of_contents',
  SpectralRuleset = 'spectral_ruleset',
  SpectralBundle = 'spectral_bundle',
}

/**
 * Node data formats
 */
export enum NodeFormat {
  Json = 'json',
  Markdown = 'markdown',
  Yaml = 'yaml',
}
