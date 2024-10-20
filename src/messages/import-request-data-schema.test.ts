import schema from './import-request-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
  strictRequired: false,
})
ajv.addSchema(resourceSchema);

describe('Import request data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Validates correct data", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      config: {
        type: "type"
      },
    })).to.be.true;
    expect(validate({
      config: {
        type: "type",
        name: "name",
        propA: "a",
        propB: { a: 'b' }
      },
    })).to.be.true;
    expect(validate({
      config: {
        type: "type",
        dependsOn: ["a", "b"]
      },
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
