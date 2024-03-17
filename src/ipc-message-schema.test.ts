import schema from './ipc-message-schema.json';
import { describe, it, expect } from 'vitest'
import Ajv from "ajv";

const ajv = new Ajv({
  strict: true,
})

describe("Ipc message schema tests", () => {
  it("compiles", () => {
    ajv.compile(schema);
  })

  it("requires a cmd field to be specified", () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", data: "data" })).to.be.true;
    expect(validate({ data: "data" })).to.be.false;
  })

  it("has an optional status field for responses", () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", status: "success", data: "data" })).to.be.true;
    expect(validate({ cmd: "doSomething", status: "error", data: "data" })).to.be.true;
    expect(validate({ cmd: "doSomething", status: "other", data: "data" })).to.be.false;
    expect(validate({ cmd: "doSomething", data: "data" })).to.be.true;
  })

  it ("accepts data or null", () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", data: "data" })).to.be.true;
    expect(validate({ cmd: "doSomething", data: null })).to.be.true;
    expect(validate({ cmd: "doSomething" })).to.be.false;
    expect(validate({ cmd: "doSomething", data: {} })).to.be.true;
  });

});
