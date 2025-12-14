import schema from './plan-response-data-schema.json';
import resourceSchema from '../resource-schema.json'
import {describe, expect, it} from 'vitest'
import Ajv from 'ajv'
import addFormats from 'ajv-formats';
import {ParameterOperation, PlanResponseData, ResourceOperation} from "../types/index.js";

const ajv = new Ajv({
  strict: true,
})
addFormats.default(ajv);
ajv.addSchema(resourceSchema);

describe('Plan response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("validates correct config", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      planId: 'eb367e53-21a8-4c9e-a38b-c99e7c821344',
      operation: ResourceOperation.CREATE,
      resourceType: 'type1',
      isStateful: true,
      parameters: [{
        name: 'parameter1',
        operation: ParameterOperation.ADD,
        previousValue: null,
        newValue: 'abc',
        isSensitive: false,
      }]
    } as PlanResponseData)).to.be.true;
  })

  it ("validates incorrect config", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      planId: 'eb367e53-21a8-4c9e-a38b-c99e7c821344',
      parameters: []
    })).to.be.false;
  });

})
