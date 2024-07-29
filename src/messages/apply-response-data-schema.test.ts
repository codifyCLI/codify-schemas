import schema from './apply-response-data-schema.json';
import {describe, expect, it} from 'vitest'
import addFormats from 'ajv-formats';
import Ajv from 'ajv';

const ajv = new Ajv.default({
  strict: true,
})

addFormats.default(ajv);

describe('Apply request data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("validates an empty config", () => {
    const validate = ajv.compile(schema);
    expect(validate(null)).to.be.true;
  })
})
