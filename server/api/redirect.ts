import { z } from 'zod'
import { eq, sql } from 'drizzle-orm'
import { posts } from '~/db/schema'

export default defineRequestHandler(async event => {
  const parsedBody = await useQuery(
    event,
    z.object({
      postId: z.string().uuid('Invalid post id'),
    })
  )

  if (!parsedBody.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body',
      data: parsedBody.error,
    })
  }

  const post = await event.context.drizzle
    .update(posts)
    .set({
      clicks: sql`${posts.clicks} + 1`,
    })
    .where(eq(posts.id, parsedBody.data.postId))
    .returning({
      url: posts.link,
    })

  if (!post || post.length !== 1) {
    throw createError({
      statusCode: 404,
      message: 'Poste introuvable',
    })
  }

  return sendRedirect(event, post[0].url)
})
