import { H3Event } from 'h3'

export default function useToken(event: H3Event) {
  const authorization = getHeader(event, 'Authorization')
  if (!authorization) return null
  return authorization.split(' ')[1]
}
