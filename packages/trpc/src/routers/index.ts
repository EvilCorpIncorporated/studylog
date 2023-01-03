import { z } from 'zod';
import e from '@studylog/edgedb';
import type { Client } from 'edgedb';
import { publicProcedure, router } from '..';

export function createAppRouter(edgedb: Client) {
  return router({
    addEvents: publicProcedure
      .input(
        z.object({
          user_id: z.string(),
          events: z.array(
            z.object({
              tab: z.object({
                active: z.boolean(),
                url: z.string(),
                title: z.string(),
              }),
              enter_time: z.date({ coerce: true }),
            }),
          ),
        }),
      )
      .mutation(async req => {
        const { events, user_id } = req.input;

        const query = e.params({ events: e.json }, $ => {
          return e.for(e.json_array_unpack($.events), event => {
            return e.insert(e.Event, {
              tab: e.insert(e.Tab, {
                // TODO: remove '!' assure that the properties are not null
                active: e.cast(e.bool, event.tab!.active!),
                url: e.cast(e.str, event.tab!.url!),
                title: e.cast(e.str, event.tab!.title!),
              }),
              // TODO: remove '!', assure that the enter_time is not null
              enter_time: e.cast(e.datetime, event.enter_time!),
              user: e.insert(e.User, { user_id }).unlessConflict(user => ({
                on: user.user_id,
                else: user,
              })),
            });
          });
        });
        const result = await query.run(edgedb, { events });
        return result;
      }),
  });
}

// Export type definition of API.
export type AppRouter = ReturnType<typeof createAppRouter>;
