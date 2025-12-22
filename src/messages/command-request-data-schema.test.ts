import schema from './command-request-data-schema.json';
import {describe, expect, it} from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
})

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("Passes a command in the body", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      command: 'abc def',
      type: 'sudo'
    })).to.be.true;
  })

  it("Allows options to be set for the command", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      command: 'abc def',
      type: 'interactive',
      options: {
        cwd: '.',
      }
    })).to.be.true;
  })

  it("Allows additional options to be set for options", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      command: 'abc def',
      type: 'sudo',
      options: {
        cwd: '.',
        requiresRoot: true,
        throws: false,
      }
    })).to.be.true;
  })

  it("Prevent additional options to be set for the top level object", () => {
    const validate = ajv.compile(schema);
    expect(validate({
      command: 'abc def',
      type: 'interactive',
      options: {
        cwd: '.',
      },
      additional: {}
    })).to.be.false;
  })
})
