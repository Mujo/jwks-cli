import { JWK, KeyLike, exportSPKI, importJWK } from 'jose'

export const jwkToX509 = async (jwk: JWK): Promise<string> => {
  const pubJwk = await importJWK({
    n: jwk.n,
    e: jwk.e,
    kty: 'RSA',
    kid: jwk.kid,
  }, 'PS256') as KeyLike

  const x509 = await exportSPKI(pubJwk)
  return x509
}