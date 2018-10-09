// Here is OAS crazy subset of JSON Schema: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#schemaObject
// For now, let's keep it open-ended
export interface ISchema {
  // anything goes for now
  [key: string]: any;
}
