import {SpawnOptions} from "node:child_process";

export interface StringIndexedObject {
  [x: string]: unknown;
}

export interface Config extends StringIndexedObject {
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

export interface ValidateResponseData {
  validationResults: Array<{
    resourceType: string;
    resourceName?: string;
    isValid: boolean;
    errors?: unknown[] | null;
  }>;
}

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
  planId?: string;
  plan?: {
    operation: ResourceOperation;
    resourceName?: string;
    resourceType: string;
    parameters: Array<{
      name: string;
      operation: ParameterOperation;
      newValue: unknown | null;
      previousValue: unknown | null;
    }>
  }
}

export interface ResourceDefinition {
  type: string;
  dependencies: string[];
}

export interface InitializeRequestData {}

export interface InitializeResponseData {
  resourceDefinitions: Array<{
    type: string;
    dependencies: string[];
  }>;
}

export interface SudoRequestData {
  command: string;
  options: {
    cwd?: string;
  } & Omit<SpawnOptions, 'stdio' | 'shell' | 'detached'>
}

export enum SpawnStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface SudoRequestResponseData {
  status: SpawnStatus,
  data: string;
}
