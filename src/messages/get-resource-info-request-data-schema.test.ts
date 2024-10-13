import schema from './get-resource-info-request-data-schema.json';
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv.default({
  strict: true,
})

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Validates a correct response", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      type: 'type',
    })).to.be.true;
  })

  it("Rejects an invalid response", () => {
    const validate = ajv.compile(schema);
    expect(validate({})).to.be.false;
  })

})
