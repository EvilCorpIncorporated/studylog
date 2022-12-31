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
              enter_time: z.date({ coerce: true }),
              exit_time: z.date({ coerce: true }),
            }),
          ),
        }),
      )
      .mutation(async req => {
        const { events, user_id } = req.input;
        const query = e.params({ events: e.json }, $ => {
          return e.for(e.json_array_unpack($.events), event => {
            return e.insert(e.Event, {
              // @ts-expect-error FIXME: we need to figure out the correct way to cast this json to a datetime.
              exit_time: e.cast(e.datetime, event.exit_time),
              // @ts-expect-error FIXME: we need to figure out the correct way to cast this json to a datetime.
              enter_time: e.cast(e.datetime, event.enter_time),
              user: e.insert(e.User, { user_id }),
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
