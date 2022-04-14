import { createHash } from 'crypto'

const fromBase64 = (base64: string) => base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
const encodeBuffer = (buf: Buffer) => fromBase64(buf.toString('base64'))
const normalize = (cert: string) => cert.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s|=)/g, '')
export const thumbprint = (cert: string): string => encodeBuffer(createHash('sha256').update(Buffer.from(normalize(cert), 'base64')).digest())
