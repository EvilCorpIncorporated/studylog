import { z } from 'zod';
import e from '@studylog/edgedb';
import type { Client } from 'edgedb';
import { publicProcedure, router } from '..';

const zod_input = z.object({
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
});

async function _mutation(edgedb: Client, req: any) {
  // TODO: change the name of this function - not informative
  // TODO: break this function down, this function is too clutered.
  const { events, user_id } = req.input;

  const query = e.params({ events: e.json }, $ => {
    return e.for(e.json_array_unpack($.events), event => {
      // const object_unpack = e.json_object_unpack(event)
      return e.insert(e.Event, {
        tab: e.insert(e.Tab, {
          active: true,
          url: 'test',
          title: 'test',
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
}

export function createAppRouter(edgedb: Client) {
  return router({
    addEvents: publicProcedure.input(zod_input).mutation(async req => {
      return await _mutation(edgedb, req);
    }),
  });
}

// Export type definition of API.
export type AppRouter = ReturnType<typeof createAppRouter>;
