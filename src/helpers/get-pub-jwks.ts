import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import { JWKS } from '../models/jwks'
import { makeJwk } from './make-jwk'

export const getPubJwks = async (all: string): Promise<JWKS> => {
  if (typeof all === 'boolean') {
    all = ''
  }
  const dir = path.resolve(all || process.cwd())
  const pemFiles = readdirSync(dir)
    .filter(f => path.extname(f).toLowerCase() === '.pem')

  const jwks: JWKS = { keys: [] }

  for (const pemFile of pemFiles) {
    const fullPath = path.join(dir, pemFile)
    const x509 = readFileSync(fullPath).toString()
    const jwk = await makeJwk(x509)
    if (jwk) {
      jwks.keys.push(jwk)
    }
  }
  return jwks
}
