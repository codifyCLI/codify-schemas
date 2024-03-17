import schema from './project-schema.json';
import { describe, it, expect } from 'vitest'
import Ajv from "ajv";

const ajv = new Ajv({
  strict: true,
})

describe("project file schema tests", () => {
  it('compiles', () => {
    ajv.compile(schema);
  })

  it("must have type project", () => {
    const validator = ajv.compile(schema);
    expect(validator({ type: 'project' })).to.be.true;
    expect(validator({})).to.be.false;
    expect(validator({ type: 'resource' })).to.be.false;
  })

  it("plugins must be <string, string>", () => {
    const validator = ajv.compile(schema);
    expect(validator({
      type: 'project',
      plugins: {
        "plugin1": "3.2.3"
      }
    })).to.be.true;

    expect(validator({
      type: 'project',
      plugins: {
        "plugin1": 1,
      }
    })).to.be.false;

    expect(validator({
      type: 'project',
      plugins: {
        "plugins2": "https://link.to.plugin.com"
      }
    })).to.be.true;
  })
})
