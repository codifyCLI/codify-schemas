import schema from './ipc-message-schema-v2.json';
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
})

describe("Ipc message schema tests V2", () => {
  it("compiles", () => {
    ajv.compile(schema);
  })

  it("requires a cmd field to be specified", () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", data: "data", requestId: "5d8x8ew" })).to.be.true;
    expect(validate({ data: "data", requestId: "5d8x8ew" })).to.be.false;
  })

  it("has an optional status field for responses", () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", status: "success", data: "data", requestId: "5d8x8ew" })).to.be.true;
    expect(validate({ cmd: "doSomething", status: "error", data: "data", requestId: "5d8x8ew" })).to.be.true;
    expect(validate({ cmd: "doSomething", status: "other", data: "data", requestId: "5d8x8ew" })).to.be.false;
    expect(validate({ cmd: "doSomething", data: "data", requestId: "5d8x8ew" })).to.be.true;
  })

  it ("accepts data or null", () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", data: "data", requestId: "5d8x8ew" })).to.be.true;
    expect(validate({ cmd: "doSomething", data: null, requestId: "5d8x8ew" })).to.be.true;
    expect(validate({ cmd: "doSomething", requestId: "5d8x8ew" })).to.be.false;
    expect(validate({ cmd: "doSomething", data: {}, requestId: "5d8x8ew" })).to.be.true;
  });

  it('Requires a uid', () => {
    const validate = ajv.compile(schema);
    expect(validate({ cmd: "doSomething", data: "data", requestId: "5d8x8ew" })).to.be.true;
    expect(validate({ cmd: "doSomething", data: "data" })).to.be.false;
  })

});
