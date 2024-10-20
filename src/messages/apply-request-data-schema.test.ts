import schema from './apply-request-data-schema.json';
import resourceSchema from '../resource-schema.json'
import {describe, expect, it} from 'vitest'
import addFormats from 'ajv-formats';
import { ApplyRequestData, ParameterOperation, ResourceOperation } from "../types/index.js";
import Ajv from 'ajv';

const ajv = new Ajv({
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
          newValue: 'abc',
          previousValue: null,
        }]
      }
    } as ApplyRequestData)).to.be.true;
  })

  it("validates correct no-op config (plan)", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      plan: {
        operation: ResourceOperation.CREATE,
        resourceType: 'type1',
        parameters: [{
          name: 'parameter1',
          operation: ParameterOperation.NOOP,
          newValue: null,
          previousValue: null,
        }]
      }
    } as ApplyRequestData)).to.be.true;
  })

  it("validates errors on empty body", () => {
    const validate = ajv.compile(schema);
    expect(validate({
    } as ApplyRequestData)).to.be.false;
  });

  it("validates errors when both plan and planId are defined", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      planId: 'eb367e53-21a8-4c9e-a38b-c99e7c821344',
      plan: {
        operation: ResourceOperation.CREATE,
        resourceType: 'type1',
        parameters: [{
          name: 'parameter1',
          operation: ParameterOperation.ADD,
          newValue: 'abc',
          previousValue: null,
        }]
      }
    } as ApplyRequestData)).to.be.false;
  });
})
