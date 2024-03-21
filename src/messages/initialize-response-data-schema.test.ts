import schema from './initialize-response-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv2020 from 'ajv/dist/2020.js'

const ajv = new Ajv2020.default({
  strict: true,
})

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("requires type and dependencies to be defined", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      resourceDefinitions: [
        {
          type: 'typeA',
          dependencies: ['typeB']
        },
        {
          type: 'typeB',
          dependencies: [],
        }
      ]
    })).to.be.true;

    expect(validate({
      resourceDefinitions: [
        {
          dependencies: ['typeB']
        },
        {
          type: 'typeB',
        }
      ]
    })).to.be.false;
  });

})
