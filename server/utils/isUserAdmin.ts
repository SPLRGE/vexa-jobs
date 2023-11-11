import { H3Event } from 'h3'

export default function isUserAdmin(event: H3Event) {
  return event.context.user?.role === 'ADMIN'
}
