# jwks-cli 

___This is a cli tool to convert certificates and keys into `JWK` (json web key) or `JWKS` (json web key set) and to convert back to private and public keys.___

_This was created to help the setup of the `Open Finance Brasil` security and conformance tests, and to help the configuration of the id providers and fapi clients._


## Install instructions
_install `jwks-cli` globally:_
```bash
npm i -g jwks-cli
```

## Usage
_use the help command for usage:_
```bash
$ jwks -h
```
_it returns:_
```text
Usage: jwks [options]
Options:
  -c, --cert <path>  Path to the certificate file
  -k, --key <path>   Path to the private key file
  -o, --out <type>   Output type: jwks, public (pub), private (priv)
  -j, --jwks <path>  Path to the JWKS file
  -m, --make <num>   Make <num> self signed certificates with keys
  -a, --all          Make jwks from all .pem and .key pairs in current (or passed) folder
  -h, --help         Show this help
Examples:
  $ jwks -c cert.pem -k cert.key
  $ jwks -c cert.pem -k cert.key -o pub
  $ jwks -c cert.pem -k cert.key -o pub,jwks
  $ jwks -a
  $ jwks -a -o pub
  $ jwks -j jwks.json
  $ jwks -j jwks.json -o pub,priv
  $ jwks -m 3
```
