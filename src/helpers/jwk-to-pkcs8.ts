import { JWK, KeyLike, exportPKCS8, importJWK } from 'jose'

export const jwkToPKCS8 = async (jwk: JWK): Promise<string> => {
	const privKey = await importJWK(jwk, 'PS256') as KeyLike

	const pkcs8 = await exportPKCS8(privKey)
	return pkcs8
}