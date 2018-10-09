import { INodeVariable } from './node';

export interface IServer {
  url: string;
  name?: string;
  description?: string;
  variables?: {
    [name: string]: INodeVariable;
  };
}
