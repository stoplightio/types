import { INodeVariable } from './graph';

export interface IServer {
  url: string;
  name?: string;
  description?: string;
  variables?: {
    [name: string]: INodeVariable;
  };
}
