import configSchema from './config-file-schema.json';
import resourceSchema from './resource-schema.json';
import { describe, it, expect } from 'vitest'
import Ajv from "ajv";

const ajv = new Ajv({
  strict: true,
})
ajv.addSchema(resourceSchema);

describe("config file schema tests", () => {
  it('compiles', () => {
    ajv.compile(configSchema);
  })

  it('accepts resource blocks', () => {
    const validator = ajv.compile(configSchema);

    expect(validator([
      {
        "type": "resource1",
      },
      {
        "type": "resource2",
        "name": "abc",
        "prop1": {
          "a": "b",
        },
        "prop2": "c"
      }
    ])).to.be.true;

    expect(validator([
      {
        "type": "resource1",
      },
      {}
    ])).to.be.false;

    expect(validator([
      {
        "type": "project",
      },
      {
        "type": "resource2"
      }
    ])).to.be.true;
  })

})
