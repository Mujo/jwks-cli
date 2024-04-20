import { JWK, exportJWK, importPKCS8, importX509 } from 'jose'
import { thumbprint } from './thumbprint'

export const makeJwk = async (x509?: string, pkcs8?: string): Promise<JWK> => {
	if (!x509) {
		return null
	}
	const key = pkcs8 ? await importPKCS8(pkcs8, 'PS256') : await importX509(x509, 'PS256')
	const jwk = await exportJWK(key)

	const isEnc = x509.includes('PUBLIC')
	jwk.alg = isEnc ? 'RSA-OAEP' : 'PS256'
	jwk.kid = thumbprint(x509, isEnc ? 'hex' : 'base64')
	jwk.use = isEnc ? 'enc' : 'sig'

	return jwk
}