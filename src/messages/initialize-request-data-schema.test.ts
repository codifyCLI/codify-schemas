import schema from './initialize-request-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv2020 from 'ajv/dist/2020.js'

const ajv = new Ajv2020.default({
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
