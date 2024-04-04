import minimist from 'minimist'

const args = minimist(process.argv.slice(2))

const main = async () => {
	console.log(args)
}

main()
