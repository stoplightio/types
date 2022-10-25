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
  Styleguide = 'styleguide',
  Image = 'image',
}

/**
 * Node data formats
 */
export enum NodeFormat {
  Json = 'json',
  Markdown = 'markdown',
  Yaml = 'yaml',
  Javascript = 'javascript',
  Apng = 'apng', // https://caniuse.com/apng
  Avif = 'avif', // https://caniuse.com/avif
  Bmp = 'bmp', // allowed bc we historically supported it
  Gif = 'gif',
  Jpeg = 'jpeg',
  Png = 'png',
  Svg = 'svg', // https://caniuse.com/svg-img
  Webp = 'webp', // https://caniuse.com/webp
}
