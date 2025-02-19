import schema from './match-request-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
  strictRequired: false,
})
ajv.addSchema(resourceSchema);

describe('Matches request data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Validates a correct request", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      resource: {
        core: {
          type: "type"
        },
        parameters: {
          param1: 'a',
          param2: 2
        }
      },
      array: [
        {
          core: {
            type: "type"
          },
          parameters: {
            param1: 'a',
            param2: 2
          }
        },
        {
          core: {
            type: "type2"
          },
          parameters: {
            param1: 'a',
            param2: 2
          }
        }
      ]
    })).to.be.true;
  })

  it("Rejects an invalid request", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      resource: {
        core: {
          type: "type"
        },
        parameters: {
          param1: 'a',
          param2: 2
        }
      },
      array: [
        {
          core: {
            type: "type"
          },
          parameters: {
            param1: 'a',
            param2: 2
          }
        },
        {
          core: {
          },
          parameters: {
            param1: 'a',
            param2: 2
          }
        }
      ]
    })).to.be.false;
  })

})
