const ConfigFileSchema = await import('./config-file-schema.json', {assert: {type: 'json'}})
const ProjectSchema = await import('./project-schema.json', {assert: {type: 'json'}})
const ResourceSchema = await import('./resource-schema.json', {assert: {type: 'json'}})
const IpcMessageSchema = await import('./ipc-message-schema.json', {assert: {type: 'json'}})
const IpcMessageV2Schema = await import('./ipc-message-schema-v2.json', {assert: {type: 'json'}})
const ApplyRequestDataSchema = await import('./messages/apply-request-data-schema.json', {assert: {type: 'json'}})
const ApplyResponseDataSchema = await import('./messages/apply-response-data-schema.json', {assert: {type: 'json'}})
const ErrorResponseDataSchema = await import('./messages/error-response-data-schema.json', {assert: {type: 'json'}})
const GetResourceInfoRequestDataSchema = await import('./messages/get-resource-info-request-data-schema.json', {assert: {type: 'json'}})
const GetResourceInfoResponseDataSchema = await import('./messages/get-resource-info-response-data-schema.json', {assert: {type: 'json'}})
const ImportRequestDataSchema = await import('./messages/import-request-data-schema.json', {assert: {type: 'json'}})
const ImportResponseDataSchema = await import('./messages/import-response-data-schema.json', {assert: {type: 'json'}})
const PlanRequestDataSchema = await import('./messages/plan-request-data-schema.json', {assert: {type: 'json'}})
const PlanResponseDataSchema = await import('./messages/plan-response-data-schema.json', {assert: {type: 'json'}})
const ValidateRequestDataSchema = await import('./messages/validate-request-data-schema.json', {assert: {type: 'json'}})
const ValidateResponseDataSchema = await import('./messages/validate-response-data-schema.json', {assert: {type: 'json'}})
const InitializeRequestDataSchema = await import('./messages/initialize-request-data-schema.json', {assert: {type: 'json'}})
const InitializeResponseDataSchema = await import('./messages/initialize-response-data-schema.json', {assert: {type: 'json'}})
const SudoRequestDataSchema = await import('./messages/sudo-request-data-schema.json', {assert: {type: 'json'}});
const SudoRequestResponseDataSchema = await import('./messages/sudo-response-data-schema.json', {assert: {type: 'json'}});

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
