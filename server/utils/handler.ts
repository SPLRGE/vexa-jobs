import type { EventHandler, EventHandlerRequest } from 'h3'
import { defineEventHandler } from 'h3'

export const defineRequestHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async event => {
    const response = await handler(event)

    if (event.context.dbClient) event.context.dbClient.end()

    return response
  })
