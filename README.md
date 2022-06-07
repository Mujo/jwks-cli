# jwks-cli 

___`jwks-cli` is a cli tool to generate a `JWKS` from a sign certificate, or generate a private certificate from a jwks.___

_this project was created to help the initial configuration of `openid FAPI certification`._


## Install instructions
_install `jwks-cli` globally:_
```
npm i -g jwks-cli
```

## Usages
_using default values (`./sign.key` and `./sign.pem`):_
```bash
jwks
```

_using other paths:_
```bash
jwks  --cert ./my-cert.pem --key ./my-cert.key
```

_generating certificate from jwks:_
```bash
jwks  --jwks ./my-jwks.json
```