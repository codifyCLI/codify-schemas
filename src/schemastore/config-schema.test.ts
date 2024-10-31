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
        "type": "homebrew",
      },
      {
        "type": "git",
        "email": "evon@gmail.com"
      }
    ])).to.be.true;

    expect(validator([
      {
        "type": "jenv",
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
    ])).to.be.true

    expect(validator([
      {
        "type": "project",
      },
      {
        "type": "asdf"
      }
    ])).to.be.true;
  })

  it('And errors on improper json', () => {
    const validator = ajv.compile(schema);

    expect(validator({ // must be a top level array
    })).to.be.false;

    expect(validator([
      {
        "type": "resource1" // type Id is not valid
      },
    ])).to.be.false;

    expect(validator([
      {
        "type": "homebrew"
      },
      "homebrew" // must be an array of objects
    ])).to.be.false;

    expect(validator([
      {
        "type": "homebrew"
      },
      {} // must contain type
    ])).to.be.false;

    expect(validator([
      {
        "type": "resource1",
        "dependsOn": {} //must be array
      }
    ])).to.be.false;

    expect(validator([
      {
        "type": "project",
      },
      {
        "type": "resource1" // not a valid typeId
      }
    ])).to.be.false;
  })
})
