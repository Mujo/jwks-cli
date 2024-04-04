import fs from 'fs'
import path from 'path'
import { JWKS } from '../models/jwks'
import { Params } from '../models/params'
import { makeJwk } from './pkcs8-to-jwk'

export const getPubJwks = async (all: string): Promise<JWKS> => {
	if (typeof all === 'boolean') {
		all = ''
	}
	const pemFiles = fs.readdirSync(path.join(process.cwd(), all))
		.filter(f => path.extname(f).toLowerCase() === '.pem')

	const jwks: JWKS = { keys: [] }

	for (const pemFile of pemFiles) {
		const signingCert = fs.readFileSync(pemFile).toString()
		const jwk = await makeJwk(signingCert)
		jwks.keys.push(jwk)
	}
	return jwks
}
