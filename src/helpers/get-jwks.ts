import fs from 'fs'
import { exportJWK, importPKCS8, importX509 } from 'jose'
import path from 'path'
import { JWKS } from '../models/jwks'
import { Params } from '../models/params'
import { thumbprint } from './thumbprint'

export const getJwks = async (params: Params): Promise<JWKS> => {
	if (typeof params.all === 'boolean') {
		params.all = ''
	}
	const pemFiles = fs.readdirSync(path.join(process.cwd(), params.all))
		.filter(f => path.extname(f).toLowerCase() === '.pem')
	const jwks: JWKS = { keys: [] }

	for (const pemFile of pemFiles) {
		const signingCert = fs.readFileSync(pemFile).toString()
		const pem = await importX509(signingCert, 'PS256')
		const jwk = await exportJWK(pem)
		const kid = thumbprint(signingCert)
		jwks.keys.push({
			kid,
			alg: 'PS256',
			...jwk,
		})
	}
	return jwks
}
