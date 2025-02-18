import { SpawnOptions } from "node:child_process";
import { ErrorObject } from "ajv";

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

export interface IpcMessageV2 {
  cmd: string;
  requestId: string;
  status?: MessageStatus;
  data: unknown | null;
}

/**
 * Processed resource that is in a format suitable for sending. The core parameters (such as type and name) and other parameters
 * are separate for easier processing.
 */
export interface ResourceJson {
  core: ResourceConfig;
  parameters: Record<string, unknown>;
}

export interface ValidateRequestData {
  configs: Array<ResourceJson>;
}

export interface ValidateResponseData {
  resourceValidations: Array<{
    resourceType: string;
    resourceName?: string;
    schemaValidationErrors: ErrorObject[];
    customValidationErrorMessage?: string;
    isValid: boolean;
  }>;
}

export interface PlanRequestData {
  core: ResourceConfig;
  desired?: Record<string, unknown>;
  state?: Record<string, unknown>;
  isStateful: boolean
}

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
  isStateful: boolean;
  parameters: Array<{
    name: string;
    operation: ParameterOperation;
    previousValue: unknown | null;
    newValue: unknown | null;
  }>
}

export interface GetResourceInfoRequestData {
  type: string;
}

export interface GetResourceInfoResponseData {
  plugin: string;
  type: string;
  schema?: Record<string, unknown>,
  dependencies?: string[],
  /**
   * @deprecated: Use import and destroy instead.
   */
  import?: {
    requiredParameters: string[] | null,
  },
  importAndDestroy?: {
    requiredParameters: string[] | null,
    preventImport?: boolean,
  },
  allowMultiple?: {
    requiredParameters: string[]
  }
}

export interface ImportRequestData {
  core: ResourceConfig;
  parameters: Record<string, unknown>;
}

export interface ImportResponseData {
  request: ResourceJson
  result: Array<ResourceJson>,
}

export interface ApplyRequestData {
  planId?: string;
  plan?: {
    operation: ResourceOperation;
    resourceName?: string;
    resourceType: string;
    isStateful: boolean;
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
  resourceDefinitions: Array<ResourceDefinition>;
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
