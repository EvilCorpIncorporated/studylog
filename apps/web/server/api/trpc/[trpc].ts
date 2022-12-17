import { createNuxtApiHandler } from 'trpc-nuxt';
// @ts-expect-error HACK: something to do with package.json subpath exports.
import { appRouter } from '@studylog/trpc/routers';
// @ts-expect-error HACK: something to do with package.json subpath exports.
import { createContext } from '@studylog/trpc/context';

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
});
