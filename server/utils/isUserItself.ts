import { H3Event } from 'h3'

export default function isUserIfself(event: H3Event, id: number) {
  return event.context.user?.id === id
}
