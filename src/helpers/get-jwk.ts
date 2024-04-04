import { existsSync, readFileSync } from 'fs'
import { JWK } from 'jose'
import { makeJwk } from './pkcs8-to-jwk'
import path from 'path'

export const getJwk = async (certPath: string, keyPath: string): Promise<JWK> => {

	const pkcs8Path = path.resolve(keyPath)
	const x509Path = path.resolve(certPath)
	const pkcs8 = existsSync(pkcs8Path) ? readFileSync(pkcs8Path, 'utf-8') : ''
	const x509 = existsSync(x509Path) ? readFileSync(x509Path).toString() : ''
	const jwk: JWK = await makeJwk(x509, pkcs8)
	return jwk
}
