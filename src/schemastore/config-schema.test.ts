import schema from './codify-schema.json';
import { describe, it, expect } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
})

describe("Config file schema tests", () => {
  it('Compiles', () => {
    ajv.compile(schema);
  })

  it('And successfully validate blocks with type', () => {
    const validator = ajv.compile(schema);

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
        "dependsOn": [
          "resource2"
        ]
      }
    ])).to.be.true;

    expect(validator([
      {
        "type": "project",
        "version": "0.0.1",
        "description": "description",
      }
    ])).to.be.true;
  })

  it('And errors on improper json', () => {
    const validator = ajv.compile(schema);

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

    expect(validator([
      {
        "type": "resource1"
      },
      {}
    ])).to.be.false;

    expect(validator([
      {
        "type": "resource1",
        "dependsOn": {}
      }
    ])).to.be.false;

    expect(validator([
      {
        "type": "project",
        "additionalProperty": true
      }
    ])).to.be.false;
  })
})
