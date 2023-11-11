import { H3Event } from 'h3'

export default function isUserLogged(event: H3Event) {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé',
    })
  }
}
