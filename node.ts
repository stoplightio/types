export interface INode {
  id: string;
  iid?: string; // An internal identifier. for example the operationId property in OAS
  tags?: INodeTag[];
  summary?: string;
  description?: string;
}

export interface INodeTag {
  name: string;
  description?: string;
}

export interface INodeVariable {
  default: string;
  description?: string;
  enum?: string[];
}
