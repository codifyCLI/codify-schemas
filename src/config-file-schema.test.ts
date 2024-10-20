import configFileSchema from './config-file-schema.json';
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
})

describe("Config file schema tests", () => {
  it('Compiles', () => {
    ajv.compile(configFileSchema);
  })

  it('And successfully validate blocks with type', () => {
    const validator = ajv.compile(configFileSchema);

    expect(validator([])).to.be.true;

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
      }
    ])).to.be.true;

    expect(validator([
      {
        "type": "project",
        "description": "description",
      }
    ])).to.be.true;
  })

  it('And errors on improper json', () => {
    const validator = ajv.compile(configFileSchema);

    expect(validator({
      "a": {},
      "b": {},
    })).to.be.false;

    expect(validator([
      {
        "type": "resource1"
      },
      "homebrew"
    ])).to.be.false;

    validator([
      {
        "type": "resource1"
      },
      {}
    ])

    console.log(validator.errors)
  })
})
