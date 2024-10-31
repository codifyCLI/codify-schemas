import schema from './plan-request-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
  strictRequired: false,
})
ajv.addSchema(resourceSchema);

describe('Plan request data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("It accepts either state, desired or both", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      desired: {
        type: "type"
      },
      isStateful: false
    })).to.be.true;
    expect(validate({
      state: {
        type: "type"
      },
      isStateful: false
    })).to.be.true;
    expect(validate({
      desired: {
        type: "type"
      },
      state: {
        type: "type"
      },
      isStateful: false
    })).to.be.true;
    expect(validate({})).to.be.false;
  })

  it ("name and type are alpha-numeric and follow variable naming conventions", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      desired: { type: "a234abcDEF_-" },
      isStateful: false
    })).to.be.true;
    expect(validate({
      desired: { type: "234" },
      isStateful: false
    })).to.be.false;
    expect(validate({
      desired: { type: "ABCDEF$" },
      isStateful: false
    })).to.be.false;

    expect(validate({
      desired: { type: "type", name: "a234abcDEF_-" },
      isStateful: false
    })).to.be.true;
    expect(validate({
      desired: { type: "type", name: "ABCDEF$" },
      isStateful: false
    })).to.be.false;
  });

})
