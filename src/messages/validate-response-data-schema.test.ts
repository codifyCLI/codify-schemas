import schema from './validate-response-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats';
import {ValidateResponseData} from "../types/index.js";

const ajv = new Ajv2020.default({
  strict: true,
})
addFormats.default(ajv);

describe('Plan response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("validates correct config", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      validationResults: [
        { resourceType: 'abc', isValid: true },
        { resourceType: 'abc', resourceName: 'def', isValid: false, errors: ["error1", "error2"] },
      ]
    } as ValidateResponseData)).to.be.true;
  })

  it ("validates incorrect config", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      validationResults: [
        { resourceName: 'abc', isValid: true },
      ]
    } as ValidateResponseData)).to.be.false;
  });

})
