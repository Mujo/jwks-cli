#!/usr/bin/env node

import minimist from 'minimist'
import { getCert } from './helpers/get-cert'
import { getJwks } from './helpers/get-jwks'
import { JWKS } from './models/jwks'
import { Params } from './models/params'

const args = minimist(process.argv.slice(2))

const main = async () => {
	try {
		const config: Params = {
			cert: args.cert || './signing.pem',
			key: args.key || './signing.key',
			jwks: args.jwks,
		}

		if (config.jwks) {
			const cert: string = await getCert(config)
			console.log(cert)
		} else {
			const jwks: JWKS = await getJwks(config)
			console.log(JSON.stringify(jwks, null, 2))
		}

	} catch (err) {
		console.error(err.message)
	}
}
main()