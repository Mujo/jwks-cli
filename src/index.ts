#!/usr/bin/env node

import { JWK } from 'jose'
import minimist from 'minimist'
import { getJwk } from './helpers/get-jwk'
import { getPKCS8 } from './helpers/get-pkcs8'
import { getPrivJwks } from './helpers/get-priv-jwks'
import { getPubJwks } from './helpers/get-pub-jwks'
import { getX509 } from './helpers/get-x509'
import { makeCerts } from './helpers/make-cert'
import { JWKS } from './models/jwks'
import { Params } from './models/params'

const args = minimist(process.argv.slice(2))

const main = async () => {
	try {
		const config: Params = {
			cert: args.cert || args.c,
			key: args.key || args.k,
			jwks: args.jwks || args.j,
			make: args.make || args.m,
			all: args.all || args.a,
			out: args.out || args.o,
		}

		if (args.h || args.help) {
			console.log('Usage: jwks [options]')
			console.log('Options:')
			console.log('  -c, --cert <path>  Path to the certificate file')
			console.log('  -k, --key <path>   Path to the private key file')
			console.log('  -o, --out <type>   Output type: jwks, public (pub), private (priv)')
			console.log('  -j, --jwks <path>  Path to the JWKS file')
			console.log('  -m, --make <num>   Make <num> self signed certificates with keys')
			console.log('  -a, --all          Get all public keys')
			console.log('  -h, --help         Show this help')

			return
		}

		if (config.jwks) {
			if (config.out?.includes('pub')) {
				const x509: string = await getX509(config.jwks)
				console.log(x509)
				return
			}

			const pkcs8: string = await getPKCS8(config.jwks)
			console.log(pkcs8)
			return
		}

		if (config.all) {
			if (config.out?.includes('pub')) {
				const jwks: JWKS = await getPubJwks(config.all)
				console.log(JSON.stringify(jwks, null, 2))
				return
			}
			const jwks: JWKS = await getPrivJwks(config.all)
			console.log(JSON.stringify(jwks, null, 2))
			return
		}

		if (config.make) {
			await makeCerts(config)
			return
		}

		if (config.cert || config.key) {
			const jwk: JWK = await getJwk(config.cert, config.out?.includes('pub') ? undefined : config.key)
			if (config.out?.includes('jwks')) {
				const jwks: JWKS = { keys: [jwk] }
				console.log(JSON.stringify(jwks, null, 2))
				return
			}
			console.log(JSON.stringify(jwk, null, 2))
			return
		}

	} catch (err) {
		console.error(err)
	}
}
main()