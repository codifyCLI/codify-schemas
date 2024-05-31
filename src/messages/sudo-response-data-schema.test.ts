import schema from './sudo-response-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv2020 from 'ajv/dist/2020.js'

const ajv = new Ajv2020.default({
  strict: true,
})

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Validates a successful sudo request response", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      status: 'success',
      data: 'sudo: was a success'
    })).to.be.true;
  })

  it("Validates a sudo request error response", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      status: 'error',
      data: 'sudo: failed'
    })).to.be.true;
  })
})
