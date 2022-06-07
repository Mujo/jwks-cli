import { spawnSync } from 'child_process'
import path from 'path'
import { Params } from '../models/params'

export const makeCerts = async (params: Params): Promise<void> => {
	const num = params.make || 1
	for (let i = 1; i <= num; i++) {
		const pemPath = path.join(process.cwd(), `sign${i}.pem`)
		const keyPath = path.join(process.cwd(), `sign${i}.key`)
		spawnSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-keyout', keyPath, '-out', pemPath, '-sha256', '-days', '365', '-nodes', '-batch'])
		console.log(`certs 'sign${i}.pem' and 'sign${i}.key' created`)
	}
}
