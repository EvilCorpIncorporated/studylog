import { createNuxtApiHandler } from 'trpc-nuxt';
// @ts-expect-error HACK: something to do with package.json subpath exports.
import { createAppRouter } from '@studylog/trpc/routers';
// @ts-expect-error HACK: something to do with package.json subpath exports.
import { createContext } from '@studylog/trpc/context';

import { useEdgeDB } from 'nuxt-edgedb';

// export API handler

export default defineEventHandler(event => {
  const edgedb = useEdgeDB(event);
  const appRouter = createAppRouter(edgedb);
  const handler = createNuxtApiHandler({
    router: appRouter,
    createContext,
  });
  return handler(event);
});
