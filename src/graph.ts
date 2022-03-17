export interface IShareableNode {
  id: string;
}

export interface INode extends IShareableNode {
  /** An internal identifier. For example, the operationId property in OAS. */
  iid?: string;
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

interface INodeExampleBase {
  key: string;
  summary?: string;
  description?: string;
}

export interface INodeExample extends INodeExampleBase, IShareableNode {
  value: any;
}

export interface INodeExternalExample extends INodeExampleBase {
  externalValue: string;
}
