const ConfigFileSchema = (await import('./config-file-schema.json', {assert: {type: 'json'}})).default
const ProjectSchema = (await import('./project-schema.json', {assert: {type: 'json'}})).default
const ResourceSchema = (await import('./resource-schema.json', {assert: {type: 'json'}})).default
const IpcMessageSchema = (await import('./ipc-message-schema.json', {assert: {type: 'json'}})).default
const IpcMessageV2Schema = (await import('./ipc-message-schema-v2.json', {assert: {type: 'json'}})).default
const ApplyRequestDataSchema = (await import('./messages/apply-request-data-schema.json', {assert: {type: 'json'}})).default
const ApplyResponseDataSchema = (await import('./messages/apply-response-data-schema.json', {assert: {type: 'json'}})).default
const ErrorResponseDataSchema = (await import('./messages/error-response-data-schema.json', {assert: {type: 'json'}})).default
const GetResourceInfoRequestDataSchema = (await import('./messages/get-resource-info-request-data-schema.json', {assert: {type: 'json'}})).default
const GetResourceInfoResponseDataSchema = (await import('./messages/get-resource-info-response-data-schema.json', {assert: {type: 'json'}})).default
const ImportRequestDataSchema = (await import('./messages/import-request-data-schema.json', {assert: {type: 'json'}})).default
const ImportResponseDataSchema = (await import('./messages/import-response-data-schema.json', {assert: {type: 'json'}})).default
const PlanRequestDataSchema = (await import('./messages/plan-request-data-schema.json', {assert: {type: 'json'}})).default
const PlanResponseDataSchema = (await import('./messages/plan-response-data-schema.json', {assert: {type: 'json'}})).default
const ValidateRequestDataSchema = (await import('./messages/validate-request-data-schema.json', {assert: {type: 'json'}})).default
const ValidateResponseDataSchema = (await import('./messages/validate-response-data-schema.json', {assert: {type: 'json'}})).default
const InitializeRequestDataSchema = (await import('./messages/initialize-request-data-schema.json', {assert: {type: 'json'}})).default
const InitializeResponseDataSchema = (await import('./messages/initialize-response-data-schema.json', {assert: {type: 'json'}})).default
const SudoRequestDataSchema = (await import('./messages/sudo-request-data-schema.json', {assert: {type: 'json'}})).default
const SudoRequestResponseDataSchema = (await import('./messages/sudo-response-data-schema.json', {assert: {type: 'json'}})).default

export {
  ConfigFileSchema,
  ProjectSchema,
  ResourceSchema,
  IpcMessageSchema,
  IpcMessageV2Schema,
  ApplyRequestDataSchema,
  ApplyResponseDataSchema,
  ErrorResponseDataSchema,
  GetResourceInfoRequestDataSchema,
  GetResourceInfoResponseDataSchema,
  ImportRequestDataSchema,
  ImportResponseDataSchema,
  PlanRequestDataSchema,
  PlanResponseDataSchema,
  ValidateRequestDataSchema,
  ValidateResponseDataSchema,
  InitializeRequestDataSchema,
  InitializeResponseDataSchema,
  SudoRequestDataSchema,
  SudoRequestResponseDataSchema,
}

export * from './types/index.js';
export * from './messages/commands.js';
