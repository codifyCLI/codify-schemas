export interface Config {
  type: string;
}

export interface ProjectConfig extends Config {
  version?: string;
  plugins?: Record<string, string>;
  description?: string;
}

export interface ResourceConfig extends Config {
  name?: string;
  dependsOn?: string[];
}

export enum MessageStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IpcMessage {
  cmd: string;
  status?: MessageStatus;
  data: unknown | null;
}

export interface ValidateRequestData {
  configs: ResourceConfig[];
}

export type ValidateResponseData = null;

export interface PlanRequestData extends ResourceConfig {}

export enum ResourceOperation {
  CREATE = "create",
  DESTROY = "destroy",
  MODIFY = "modify",
  RECREATE = "recreate",
  NOOP = "noop"
}

export enum ParameterOperation {
  ADD = "add",
  REMOVE = "remove",
  MODIFY = "modify",
  NOOP = "noop"
}

export interface PlanResponseData {
  planId: string;
  operation: ResourceOperation;
  resourceName?: string;
  resourceType: string;
  parameters: Array<{
    name: string;
    operation: ParameterOperation;
    previousValue: unknown | null;
    newValue: unknown | null;
  }>
}

export interface ApplyRequestData {
  planId: string;
}

export interface ResourceDefinition {
  type: string;
  dependencies: string[];
}
