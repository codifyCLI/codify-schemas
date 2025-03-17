import schema from './press-key-to-continue-response-data-schema.json';
import { describe, expect, it } from 'vitest'
import Ajv from 'ajv'

const ajv = new Ajv({
  strict: true,
})

describe('Get resources response data schema', () => {
  it('compiles', () => {
    ajv.compile(schema);
  })
})
