import { httpBatchLink, createTRPCProxyClient } from '@trpc/client';
// HACK: the following doesn't seem to work, has something to do with package.json subpath exports.
// import type { AppRouter } from '@studylog/trpc/routers';
import type { AppRouter } from '@studylog/trpc/src/routers';
import { FetchError } from 'ofetch';

export default defineNuxtPlugin(() => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',

        /**
         * Replace regular `fetch` with a `$fetch` from nuxt
         *
         * During server-side rendering, calling $fetch to fetch your internal API routes
         * will directly call the relevant function (emulating the request),
         * saving an additional API call.
         *
         * @see https://nuxt.com/docs/api/utils/dollarfetch
         */
        fetch: (input, options) =>
          globalThis.$fetch
            .raw(input.toString(), options)
            .catch(e => {
              if (e instanceof FetchError && e.response) return e.response;

              throw e;
            })
            .then(response => ({
              ...response,
              json: () => Promise.resolve(response._data),
            })),
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});
