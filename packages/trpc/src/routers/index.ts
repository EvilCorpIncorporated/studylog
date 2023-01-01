import { z } from 'zod';
import e from '@studylog/edgedb';
import type { Client } from 'edgedb';
import { publicProcedure, router } from '..';

const zod_input = z.object({
  user_id: z.string(),
  events: z.array(
    z.object({
      enter_time: z.date({ coerce: true }),
      exit_time: z.date({ coerce: true }),
    }),
  ),
});

async function _mutation(edgedb: Client, req) {
  const { events, user_id } = req.input;
  const query = e.params({ events: e.json }, $ => {
    return e.for(e.json_array_unpack($.events), event => {
      return e.insert(e.Event, {
        exit_time: e.cast(e.datetime, event.exit_time),
        enter_time: e.cast(e.datetime, event.enter_time),
        user: e.insert(e.User, { user_id }),
      });
    });
  });
  const result = await query.run(edgedb, { events });
  return result;
}

export function createAppRouter(edgedb: Client) {
  return router({
    addEvents: publicProcedure.input(zod_input).mutation( async (req) => {
      return await _mutation(edgedb, req);
    } ),
  });
}

// Export type definition of API.
export type AppRouter = ReturnType<typeof createAppRouter>;
