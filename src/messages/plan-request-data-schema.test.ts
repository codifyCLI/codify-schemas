import schema from './plan-request-data-schema.json';
import resourceSchema from '../resource-schema.json'
import { describe, it, expect } from 'vitest'
import Ajv from "ajv";

const ajv = new Ajv({
  strict: true,
})
ajv.addSchema(resourceSchema);

describe('Plan request data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("requires a type field to be specified", () => {
    const validate = ajv.compile(schema);
    expect(validate({ type: "type" })).to.be.true;
    expect(validate({})).to.be.false;
  })

  it ("name and type are alpha-numeric and follow variable naming conventions", () => {
    const validate = ajv.compile(schema);
    expect(validate({ type: "a234abcDEF_-"})).to.be.true;
    expect(validate({ type: "234"})).to.be.false;
    expect(validate({ type: "ABCDEF$"})).to.be.false;

    expect(validate({ type: "type", name: "a234abcDEF_-"})).to.be.true;
    expect(validate({ type: "type", name: "234"})).to.be.false;
    expect(validate({ type: "type", name: "ABCDEF$"})).to.be.false;
  });

})
