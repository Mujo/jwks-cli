#!/usr/bin/env node

import minimist from 'minimist'
import { getCert } from './helpers/get-cert'
import { getJwk } from './helpers/get-jwk'
import { getJwks } from './helpers/get-jwks'
import { makeCerts } from './helpers/make-cert'
import { JWKS } from './models/jwks'
import { Params } from './models/params'

const args = minimist(process.argv.slice(2))

const main = async () => {
	try {
		const config: Params = {
			cert: args.cert || './sign.pem',
			key: args.key || './sign.key',
			jwks: args.jwks,
			make: args.make,
			all: args.all,
		}

		if (config.jwks) {
			const cert: string = await getCert(config)
			console.log(cert)
		} else if (config.all) {
			const jwks: JWKS = await getJwks(config)
			console.log(JSON.stringify(jwks, null, 2))
		} else if (config.make) {
			await makeCerts(config)
		} else {
			const jwks: JWKS = await getJwk(config)
			console.log(JSON.stringify(jwks, null, 2))
		}

	} catch (err) {
		console.error(err.message)
	}
}
main()