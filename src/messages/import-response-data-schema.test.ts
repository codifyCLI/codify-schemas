import schema from './import-response-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
  strictRequired: false,
})
ajv.addSchema(resourceSchema);

describe('Import response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Validates correct data", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      request: {
        type: "type"
      },
      result: [{
        type: "type"
      }]
    })).to.be.true;
    expect(validate({
      request: {
        type: "type",
        name: "name",
        propA: "a",
        propB: { a: 'b' }
      },
      result: [{
        type: "type",
        name: "name",
        propA: "b",
        propB: null,
      }]
    })).to.be.true;
    expect(validate({
      request: {
        type: "type",
        dependsOn: ["a", "b"]
      },
      result: [{
        type: "type",
        dependsOn: ["a", "b"]
      }]
    })).to.be.true;
  })

  it("Errors on incorrect data", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      config: {},
    })).to.be.false;
    expect(validate({})).to.be.false;
  })

})
