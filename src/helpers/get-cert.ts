import fs from 'fs'
import { importJWK, exportPKCS8, KeyLike } from 'jose'
import { JWKS } from '../models/jwks'
import { Params } from '../models/params'

export const getCert = async (params: Params): Promise<string> => {
	const jwks: JWKS = JSON.parse(fs.readFileSync(params.jwks, 'utf-8'))
	const key = await importJWK(jwks.keys[0], 'PS256') as KeyLike
	const signKey = await exportPKCS8(key)
	return signKey
}
