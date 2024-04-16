import schema from './apply-request-data-schema.json';
import resourceSchema from '../resource-schema.json'
import {describe, expect, it} from 'vitest'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats';
import {ApplyRequestData, ParameterOperation, ResourceOperation} from "../types/index.js";

const ajv = new Ajv2020.default({
  strict: true,
})
addFormats.default(ajv);
ajv.addSchema(resourceSchema);

describe('Apply request data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("validates correct config (planId)", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      planId: 'eb367e53-21a8-4c9e-a38b-c99e7c821344',
    } as ApplyRequestData)).to.be.true;
  })

  it("validates correct config (plan)", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      plan: {
        operation: ResourceOperation.CREATE,
        resourceType: 'type1',
        parameters: [{
          name: 'parameter1',
          operation: ParameterOperation.ADD,
          newValue: 'abc'
        }]
      }
    } as ApplyRequestData)).to.be.true;
  })
})
