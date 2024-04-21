import { createHash } from 'crypto'

const sanitize = (base64: string) => base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
const encodeBuffer = (buf: Buffer, enc: BufferEncoding) => sanitize(buf.toString(enc))
const normalize = (cert: string) => cert.replace(/(?:-----(?:BEGIN|END) (?:CERTIFICATE|PUBLIC KEY)-----|\s|=)/g, '')
export const thumbprint = (cert: string, enc: BufferEncoding = 'base64'): string =>
  encodeBuffer(createHash('sha256').update(Buffer.from(normalize(cert), 'base64')).digest(), enc)
