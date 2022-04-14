import fs from 'fs'
import { exportJWK, importPKCS8 } from 'jose'
import { JWKS } from '../models/jwks'
import { Params } from '../models/params'
import { thumbprint } from './thumbprint'

export const getJwks = async (params: Params): Promise<JWKS> => {
	let jwk = {}
	let kid = ''

	if (fs.existsSync(params.key)) {
		const privateSigningKey = fs.readFileSync(params.key, 'utf-8')
		const key = await importPKCS8(privateSigningKey, 'PS256')
		jwk = await exportJWK(key)
	}

	if (fs.existsSync(params.cert)) {
		const signingCert = fs.readFileSync(params.cert).toString()
		kid = thumbprint(signingCert)
	}

	const jwks: JWKS = {
		keys: [
			{
				kid,
				alg: 'PS256',
				...jwk,
			}
		]
	}

	return jwks
}
