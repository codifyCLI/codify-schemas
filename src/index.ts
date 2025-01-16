import ConfigFileSchema from './config-file-schema.json' with {type: 'json'}
import ProjectSchema from './project-schema.json' with {type: 'json'}
import ResourceSchema from './resource-schema.json' with {type: 'json'}
import IpcMessageSchema from './ipc-message-schema.json' with {type: 'json'}
import IpcMessageV2Schema from './ipc-message-schema-v2.json' with {type: 'json'}
import ApplyRequestDataSchema from './messages/apply-request-data-schema.json' with {type: 'json'}
import ApplyResponseDataSchema from './messages/apply-response-data-schema.json' with {type: 'json'}
import ErrorResponseDataSchema from './messages/error-response-data-schema.json' with {type: 'json'}
import GetResourceInfoRequestDataSchema from './messages/get-resource-info-request-data-schema.json' with {type: 'json'}
import GetResourceInfoResponseDataSchema from './messages/get-resource-info-response-data-schema.json' with {type: 'json'}
import ImportRequestDataSchema from './messages/import-request-data-schema.json' with {type: 'json'}
import ImportResponseDataSchema from './messages/import-response-data-schema.json' with {type: 'json'}
import PlanRequestDataSchema from './messages/plan-request-data-schema.json' with {type: 'json'}
import PlanResponseDataSchema from './messages/plan-response-data-schema.json' with {type: 'json'}
import ValidateRequestDataSchema from './messages/validate-request-data-schema.json' with {type: 'json'}
import ValidateResponseDataSchema from './messages/validate-response-data-schema.json' with {type: 'json'}
import InitializeRequestDataSchema from './messages/initialize-request-data-schema.json' with {type: 'json'}
import InitializeResponseDataSchema from './messages/initialize-response-data-schema.json' with {type: 'json'}
import SudoRequestDataSchema from './messages/sudo-request-data-schema.json' with {type: 'json'};
import SudoRequestResponseDataSchema from './messages/sudo-response-data-schema.json' with {type: 'json'};

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
