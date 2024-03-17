const ConfigFileSchema = await import('./config-file-schema.json', {
  assert: { type: 'json'}
})
const ProjectSchema = await import('./project-schema.json', {
  assert: { type: 'json'}
})
const ResourceSchema = await import('./resource-schema.json', {
  assert: { type: 'json'}
})
const IpcMessageSchema = await import('./ipc-message-schema.json', {
  assert: { type: 'json'}
})
const ApplyRequestDataSchema = await import('./messages/apply-request-data-schema.json', {
  assert: { type: 'json'}
})
const ApplyResponseDataSchema = await import('./messages/apply-response-data-schema.json', {
  assert: { type: 'json'}
})
const ErrorResponseDataSchema = await import('./messages/error-response-data-schema.json', {
  assert: { type: 'json'}
})
const PlanRequestDataSchema = await import('./messages/plan-request-data-schema.json', {
  assert: { type: 'json'}
})
const PlanResponseDataSchema = await import('./messages/plan-response-data-schema.json', {
  assert: { type: 'json'}
})
const ValidateRequestDataSchema = await import('./messages/validate-request-data-schema.json', {
  assert: { type: 'json'}
})
const ValidateResponseDataSchema = await import('./messages/validate-response-data-schema.json', {
  assert: { type: 'json'}
})

export {
  ConfigFileSchema,
  ProjectSchema,
  ResourceSchema,
  IpcMessageSchema,
  ApplyRequestDataSchema,
  ApplyResponseDataSchema,
  ErrorResponseDataSchema,
  PlanRequestDataSchema,
  PlanResponseDataSchema,
  ValidateRequestDataSchema,
  ValidateResponseDataSchema,
}

export * from './types/index.js';
