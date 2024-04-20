import fs from 'fs'
import { JWKS } from '../models/jwks'
import { jwkToPKCS8 } from './jwk-to-pkcs8'

export const getPKCS8 = async (jwksPath: string): Promise<string> => {
	const { keys: [jwk] }: JWKS = JSON.parse(fs.readFileSync(jwksPath, 'utf-8'))

	const pkcs8 = await jwkToPKCS8(jwk)
	return pkcs8
}
