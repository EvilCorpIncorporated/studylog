import { httpBatchLink, createTRPCProxyClient } from '@trpc/client';
// HACK: the following doesn't seem to work, has something to do with package.json subpath exports.
// import type { AppRouter } from '@studylog/trpc/routers';
import type { AppRouter } from '@studylog/trpc/src/routers';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_URL,
    }),
  ],
});

export default client;
