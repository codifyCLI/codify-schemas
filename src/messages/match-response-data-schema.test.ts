import schema from './match-response-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
  strictRequired: false,
})
ajv.addSchema(resourceSchema);

describe('Match response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Validates a correct response", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      match: {
        core: {
          type: "type"
        },
        parameters: {
          param1: 'a',
          param2: 2
        }
      }
    })).to.be.true;
  })

  it("Rejects an invalid response", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      match: {
        core: {
        },
        parameters: {
          param1: 'a',
          param2: 2
        }
      }
    })).to.be.false;
  })

})
