import schema from './initialize-request-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv.default({
  strict: true,
})

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("requires an empty object", () => {
    const validate = ajv.compile(schema);
    expect(validate({})).to.be.true;
  })

})
