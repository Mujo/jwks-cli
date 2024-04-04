import fs from 'fs'
import { KeyLike, exportPKCS8, importJWK } from 'jose'
import { JWKS } from '../models/jwks'

export const getPKCS8 = async (jwksPath: string): Promise<string> => {
	const { keys: [jwk] }: JWKS = JSON.parse(fs.readFileSync(jwksPath, 'utf-8'))
	const key = await importJWK(jwk, 'PS256') as KeyLike
	const pkcs8 = await exportPKCS8(key)
	return pkcs8
}
