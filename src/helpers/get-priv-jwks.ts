import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import { JWKS } from '../models/jwks'
import { makeJwk } from './make-jwk'

export const getPrivJwks = async (all: string): Promise<JWKS> => {
  if (typeof all === 'boolean') {
    all = ''
  }
  const dir = path.resolve(all || process.cwd())
  const keyFiles = readdirSync(dir)
    .filter(f => path.extname(f).toLowerCase() === '.key' && !f.includes('.enc.'))

  const jwks: JWKS = { keys: [] }

  for (const keyFile of keyFiles) {
    const fullPath = path.join(dir, keyFile)
    const pkcs8 = readFileSync(fullPath).toString()
    const x509 = readFileSync(fullPath.replace(/\.key$/, '.pem')).toString()
    const jwk = await makeJwk(x509, pkcs8)
    if (jwk) {
      jwks.keys.push(jwk)
    }
  }

  return jwks
}
