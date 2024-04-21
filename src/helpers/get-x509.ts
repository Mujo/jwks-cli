import fs from 'fs'
import { JWKS } from '../models/jwks'
import { jwkToX509 } from './jwk-to-x509'

export const getX509 = async (jwksPath: string): Promise<string> => {
  const { keys: [jwk] }: JWKS = JSON.parse(fs.readFileSync(jwksPath, 'utf-8'))

  const x509 = await jwkToX509(jwk)
  return x509
}
