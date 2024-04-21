import { existsSync, readFileSync } from 'fs'
import { JWK } from 'jose'
import path from 'path'
import { makeJwk } from './make-jwk'

export const getJwk = async (certPath: string, keyPath: string): Promise<JWK> => {

  const pkcs8Path = keyPath ? path.resolve(keyPath) : ''
  const pkcs8 = existsSync(pkcs8Path) ? readFileSync(pkcs8Path, 'utf-8') : ''

  const x509Path = certPath ? path.resolve(certPath) : ''
  const x509 = existsSync(x509Path) ? readFileSync(x509Path).toString() : ''

  const jwk: JWK = await makeJwk(x509, pkcs8)
  return jwk
}
